import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx'; // Run 'npm install xlsx' if missing

export async function GET() {
  // Hard target multi-country portfolio demo datasets 
  const auditData = [
    { Jurisdiction: 'United Kingdom (UK)', 'Scope 1 (t)': 0, 'Scope 2 (t)': 1.2, 'Scope 3 (t)': 4.5, 'Compliance Index': 'A+' },
    { Jurisdiction: 'Kuwait (KW)', 'Scope 1 (t)': 45000, 'Scope 2 (t)': 22100, 'Scope 3 (t)': 17000, 'Compliance Index': 'B-' },
    { Jurisdiction: 'Saudi Arabia (SA)', 'Scope 1 (t)': 82000, 'Scope 2 (t)': 38500, 'Scope 3 (t)': 22000, 'Compliance Index': 'B' },
    { Jurisdiction: 'UAE (AE)', 'Scope 1 (t)': 51000, 'Scope 2 (t)': 26300, 'Scope 3 (t)': 15000, 'Compliance Index': 'A-' },
    { Jurisdiction: 'Germany (DE)', 'Scope 1 (t)': 18000, 'Scope 2 (t)': 14100, 'Scope 3 (t)': 10000, 'Compliance Index': 'A' },
    { Jurisdiction: 'Netherlands (NL)', 'Scope 1 (t)': 11000, 'Scope 2 (t)': 9400, 'Scope 3 (t)': 8000, 'Compliance Index': 'A+' },
  ];

  const worksheet = XLSX.utils.json_to_sheet(auditData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'ESG Corporate Summary');

  // Generate buffer array
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  return new NextResponse(excelBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=ESG_Carbon_Footprint_Report.xlsx',
    },
  });
}
