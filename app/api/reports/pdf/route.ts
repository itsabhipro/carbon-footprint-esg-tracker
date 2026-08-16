import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf'; // Run 'npm install jspdf' if missing
import 'jspdf-autotable';

export async function GET() {
  const doc = new jsPDF();

  // Modern Minimalist Styling Elements
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('ESG Carbon Footprint Report', 14, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generated on: ${new Date().toLocaleDateString()} | Framework: GHG Protocol & CSRD`, 14, 28);

  // Structural Data Grid Matrix
  const tableRows = [
    ['United Kingdom (UK)', 'Live API Feed', '1.2 t', 'A+ Grade'],
    ['Kuwait (KW)', '45,000 t', '22,100 t', 'B- Grade'],
    ['Saudi Arabia (SA)', '82,000 t', '38,500 t', 'B Grade'],
    ['UAE (AE)', '51,000 t', '26,300 t', 'A- Grade'],
    ['Germany (DE)', '18,000 t', '14,100 t', 'A Grade'],
    ['Netherlands (NL)', '11,000 t', '9,400 t', 'A+ Grade'],
  ];

  (doc as any).autoTable({
    startY: 38,
    head: [['Jurisdiction Node', 'Scope 1 (Direct)', 'Scope 2 (Indirect)', 'Compliance Index']],
    body: tableRows,
    headStyles: { fillColor: [16, 185, 129], fontStyle: 'bold' }, // emerald-500
    theme: 'striped',
  });

  const pdfOutput = doc.output('arraybuffer');

  return new NextResponse(pdfOutput, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=ESG_Sustainability_Audit.pdf',
    },
  });
}
