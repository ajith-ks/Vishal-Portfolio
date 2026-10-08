import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as xlsxModule from 'xlsx';
const XLSX = xlsxModule.default || xlsxModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = path.resolve(__dirname, '../content/testimonials/testimonials.xlsx');
const outputDir = path.resolve(__dirname, '../src/data');
const outputPath = path.resolve(outputDir, 'testimonials.json');

console.log('[Testimonials Pipeline] Reading Excel file from:', excelPath);

if (!fs.existsSync(excelPath)) {
  console.warn('[Testimonials Pipeline] Warning: testimonials.xlsx does not exist at path. Creating empty array.');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2), 'utf-8');
  process.exit(0);
}

try {
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames.includes('Testimonials') ? 'Testimonials' : workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Parse worksheet into array of objects using headers
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  const validTestimonials = [];

  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];
    
    // Support various header casings safely
    const name = String(row['Name'] || row['name'] || '').trim();
    let testimony = String(row['Testimony'] || row['testimony'] || row['Quote'] || row['quote'] || '').trim();
    if (testimony.startsWith('>')) {
      testimony = testimony.replace(/^>\s*/, '').trim();
    }
    const roleRaw = String(row['Student / Faculty'] || row['Student/Faculty'] || row['Role'] || row['role'] || '').trim();
    const institution = String(row['Institution Name'] || row['Institution'] || row['institution'] || '').trim();

    // Required fields: Name and Testimony
    if (!name || !testimony) {
      // Discard invalid / empty rows silently or log if partially populated
      if (name || testimony) {
        console.warn(`[Testimonials Pipeline] Skipped incomplete row ${i + 2}: Name or Testimony was missing.`);
      }
      continue;
    }

    // Role normalization (optional)
    let role = '';
    if (roleRaw.toLowerCase() === 'student') role = 'Student';
    else if (roleRaw.toLowerCase() === 'faculty') role = 'Faculty';
    else if (roleRaw) role = roleRaw; // Fallback if custom text

    validTestimonials.push({
      id: validTestimonials.length + 1,
      name,
      role: role || undefined,
      institution: institution || undefined,
      testimony
    });
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(validTestimonials, null, 2), 'utf-8');

  console.log(`[Testimonials Pipeline] Successfully processed ${validTestimonials.length} valid testimonial(s).`);
  console.log(`[Testimonials Pipeline] Saved to ${outputPath}`);
} catch (error) {
  console.error('[Testimonials Pipeline] Error parsing testimonials:', error.message);
  // Guarantee fallback empty array so build does not fail
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2), 'utf-8');
}
