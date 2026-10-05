# Testimonials Data Guide — Dr. Vishal Kattery Portfolio

This directory contains the official Excel workbook template used to populate testimonials on Dr. Vishal Kattery's portfolio website.

---

## 1. File Location & Worksheet Name

- **File Path**: `content/testimonials/testimonials.xlsx`
- **Worksheet Name**: `Testimonials` *(Do not rename this sheet tab)*

---

## 2. Column Structure & Rules

| Column Header | Requirement | Allowed Values / Format | Description |
|---|---|---|---|
| **Name** | **Required** | Text (e.g. `Ananya Sharma`) | Full name of the testimonial author. Rows with empty names are discarded. |
| **Student / Faculty** | *Optional* | `Student` or `Faculty` | Dropdown validation in Excel. May be left blank if not applicable. |
| **Institution Name** | *Optional* | Text (e.g. `Bharathiar University, Coimbatore`) | Name of the institution, university, college, or organization. |
| **Testimony** | **Required** | Text (Paragraph / Quote) | The exact words and quote from the individual. Rows with empty testimonies are discarded. |

---

## 3. Data Processing & Validation Rules

When the conversion pipeline or website loads data from `testimonials.xlsx`:

1. **Whitespace Trimming**: Leading and trailing whitespaces are automatically trimmed.
2. **Empty Row Handling**: Any completely blank row is safely ignored.
3. **Strict Validation**: Both `Name` and `Testimony` must have non-empty text to be considered a valid record.
4. **Resilience**: Invalid or partially filled rows will NOT crash the build or the website; they are simply skipped with an informative console log.
5. **No Hallucination**: Missing optional fields (`Student / Faculty`, `Institution Name`) are left blank and will not be displayed or invented.
6. **Zero Records State**: When the workbook contains 0 records (headers only), the website displays a graceful empty/development state. It will **never** display placeholder persons, fake names, or broken counter indicators like `01/0`.

---

## 4. How to Add Testimonials & Update the Website

1. Open `content/testimonials/testimonials.xlsx` in Microsoft Excel, LibreOffice, or Google Sheets.
2. Switch to the **`Testimonials`** worksheet.
3. Add rows starting from Row 2 (under the frozen headers):
   - Enter the person's name in column A.
   - Choose `Student` or `Faculty` from the dropdown in column B (or leave blank).
   - Enter their institution/college in column C (or leave blank).
   - Enter their authentic testimonial text in column D.
4. Save the file.
5. Run the build or data conversion script in the terminal:
   ```bash
   npm run build
   ```
   *(Or if running in development mode, run `node scripts/convert-testimonials.js` and refresh your browser).*
6. The updated testimonials will automatically render in the interactive testimonial slider with full keyboard, swipe, and pagination support.
