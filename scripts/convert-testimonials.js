import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as xlsxModule from 'xlsx';

const XLSX = xlsxModule.default || xlsxModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Normalizes strings for duplicate detection with consistent whitespace handling.
 * Trims leading/trailing whitespace, standardizes line breaks, collapses multiple
 * spaces/tabs, and normalizes casing.
 */
export function normalizeForComparison(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .toLowerCase();
}

/**
 * Reads testimonials from the source Excel workbook and synchronizes them into JSON.
 * Follows content/testimonials/README.md specification:
 * - Worksheet: 'Testimonials'
 * - Required fields: Name and Testimony
 * - Optional fields: Student / Faculty, Institution Name
 * - Duplicate rule: Strict Name AND Testimony match
 * - Protects data integrity: never silently overwrites on conversion error
 */
export function convertTestimonials(options = {}) {
  const excelPath = options.excelPath || path.resolve(__dirname, '../content/testimonials/testimonials.xlsx');
  const outputDir = options.outputDir || path.resolve(__dirname, '../src/data');
  const outputPath = options.outputPath || path.resolve(outputDir, 'testimonials.json');
  const silent = options.silent || false;

  const log = (...args) => { if (!silent) console.log('[Testimonials Pipeline]', ...args); };
  const warn = (...args) => { if (!silent) console.warn('[Testimonials Pipeline]', ...args); };
  const errorLog = (...args) => { console.error('[Testimonials Pipeline]', ...args); };

  log('Reading Excel file from:', excelPath);

  if (!fs.existsSync(excelPath)) {
    errorLog(`Error: Excel file does not exist at "${excelPath}". Existing JSON will NOT be modified.`);
    return { success: false, error: 'Excel file not found' };
  }

  try {
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames.includes('Testimonials') 
      ? 'Testimonials' 
      : workbook.SheetNames[0];

    if (!sheetName || !workbook.Sheets[sheetName]) {
      errorLog(`Error: Worksheet "${sheetName}" not found in workbook. Existing JSON will NOT be modified.`);
      return { success: false, error: 'Worksheet not found' };
    }

    const worksheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    const seenDuplicateKeys = new Set();
    const validTestimonials = [];

    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];

      // Support field headers per README
      const rawName = String(row['Name'] || row['name'] || '').trim();
      let rawTestimony = String(row['Testimony'] || row['testimony'] || row['Quote'] || row['quote'] || '').trim();
      if (rawTestimony.startsWith('>')) {
        rawTestimony = rawTestimony.replace(/^>\s*/, '').trim();
      }
      const rawRole = String(row['Student / Faculty'] || row['Student/Faculty'] || row['Role'] || row['role'] || '').trim();
      const rawInstitution = String(row['Institution Name'] || row['Institution'] || row['institution'] || '').trim();

      // Skip genuinely empty rows (all fields blank)
      if (!rawName && !rawTestimony && !rawRole && !rawInstitution) {
        continue;
      }

      // Strict validation: Both Name and Testimony must have non-empty text
      if (!rawName || !rawTestimony) {
        warn(`Skipped incomplete row ${i + 2}: Both Name and Testimony are required.`);
        continue;
      }

      // Strict Name AND Testimony duplicate check with consistent whitespace handling
      const compName = normalizeForComparison(rawName);
      const compTestimony = normalizeForComparison(rawTestimony);
      const duplicateKey = `${compName}|||${compTestimony}`;

      if (seenDuplicateKeys.has(duplicateKey)) {
        log(`Duplicate entry ignored (row ${i + 2}): "${rawName}" with matching testimony.`);
        continue;
      }
      seenDuplicateKeys.add(duplicateKey);

      // Role mapping per README: "Student" or "Faculty"
      let role = '';
      if (rawRole.toLowerCase() === 'student') role = 'Student';
      else if (rawRole.toLowerCase() === 'faculty') role = 'Faculty';
      else if (rawRole) role = rawRole;

      validTestimonials.push({
        id: validTestimonials.length + 1,
        name: rawName,
        role: role || undefined,
        institution: rawInstitution || undefined,
        testimony: rawTestimony
      });
    }

    // Write updated JSON (Excel is the source of truth)
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(validTestimonials, null, 2), 'utf-8');

    log(`Successfully synchronized ${validTestimonials.length} valid testimonial(s) to ${outputPath}`);
    return { success: true, count: validTestimonials.length, testimonials: validTestimonials };
  } catch (err) {
    errorLog('Error converting testimonials from Excel:', err.message);
    errorLog('Protecting data integrity: Existing JSON was NOT overwritten.');
    return { success: false, error: err.message };
  }
}

// Auto-run if executed directly as a script
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const result = convertTestimonials();
  if (!result.success) {
    process.exit(1);
  }
}
