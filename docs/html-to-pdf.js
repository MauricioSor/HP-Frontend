const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const docsDir = __dirname;

const files = [
  '01_Plan_de_Implementacion',
  '02_Walkthrough_Desarrollo',
  '03_Requerimientos_del_Sistema'
];

(async () => {
  console.log('🚀 Iniciando conversión a PDF...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const file of files) {
    const htmlPath = path.join(docsDir, `${file}.html`);
    const pdfPath = path.join(docsDir, `${file}.pdf`);
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '15mm', bottom: '20mm', left: '15mm', right: '15mm' },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;padding-top:5mm;">FinBootcamp — Proyecto Final</div>',
      footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;padding-bottom:5mm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
    });
    
    await page.close();
    console.log(`✅ PDF generado: ${file}.pdf`);
  }
  
  await browser.close();
  console.log('\n🎉 ¡Todos los PDFs generados exitosamente!');
  console.log(`📂 Ubicación: ${docsDir}`);
})();
