const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname);
const files = [
  '01_Plan_de_Implementacion.md',
  '02_Walkthrough_Desarrollo.md',
  '03_Requerimientos_del_Sistema.md'
];

const cssStyles = `
  * { box-sizing: border-box; }
  body { 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    color: #1e293b; 
    line-height: 1.7; 
    max-width: 210mm; 
    margin: 0 auto; 
    padding: 20mm;
    font-size: 13px;
  }
  h1 { 
    color: #059669; 
    border-bottom: 3px solid #059669; 
    padding-bottom: 10px; 
    font-size: 26px; 
    margin-top: 0;
  }
  h2 { 
    color: #1e293b; 
    border-bottom: 1px solid #e2e8f0; 
    padding-bottom: 6px; 
    margin-top: 35px; 
    font-size: 20px;
    page-break-after: avoid;
  }
  h3 { 
    color: #334155; 
    margin-top: 22px; 
    font-size: 16px;
    page-break-after: avoid;
  }
  p { margin: 8px 0; }
  table { 
    border-collapse: collapse; 
    width: 100%; 
    margin: 12px 0; 
    font-size: 12px;
    page-break-inside: avoid;
  }
  th { 
    background-color: #f1f5f9; 
    color: #334155; 
    padding: 8px 10px; 
    text-align: left; 
    border: 1px solid #e2e8f0; 
    font-weight: 600; 
  }
  td { 
    padding: 6px 10px; 
    border: 1px solid #e2e8f0; 
    vertical-align: top;
  }
  tr:nth-child(even) { background-color: #f8fafc; }
  code { 
    background-color: #f1f5f9; 
    padding: 1px 5px; 
    border-radius: 3px; 
    font-size: 11px; 
    color: #059669;
    font-family: 'Consolas', 'Courier New', monospace;
  }
  pre { 
    background-color: #1e293b; 
    color: #e2e8f0; 
    padding: 14px; 
    border-radius: 6px; 
    font-size: 11px; 
    overflow-x: auto;
    page-break-inside: avoid;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  pre code {
    background: none;
    color: #e2e8f0;
    padding: 0;
  }
  blockquote { 
    border-left: 4px solid #059669; 
    padding: 10px 14px; 
    background: #f0fdf4; 
    margin: 14px 0; 
    color: #166534;
    border-radius: 0 6px 6px 0;
  }
  blockquote p { margin: 4px 0; }
  hr { 
    border: none; 
    border-top: 2px solid #e2e8f0; 
    margin: 25px 0; 
  }
  strong { color: #0f172a; }
  ul, ol { padding-left: 20px; }
  li { margin: 4px 0; }
  .page-break { page-break-after: always; }
  
  @media print {
    body { padding: 15mm; }
    h2 { page-break-after: avoid; }
    table { page-break-inside: avoid; }
    .page-break { page-break-after: always; }
  }

  .header-bar {
    background: linear-gradient(135deg, #059669, #0d9488);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 11px;
  }
`;

for (const file of files) {
  const mdPath = path.join(docsDir, file);
  const htmlPath = path.join(docsDir, file.replace('.md', '.html'));
  
  let mdContent = fs.readFileSync(mdPath, 'utf-8');
  
  // Remove YAML frontmatter
  mdContent = mdContent.replace(/^---[\s\S]*?---\n*/m, '');
  // Remove <style> blocks (we use our own)
  mdContent = mdContent.replace(/<style>[\s\S]*?<\/style>/g, '');
  
  const htmlBody = marked.parse(mdContent);
  
  const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${file.replace('.md', '').replace(/_/g, ' ')}</title>
  <style>${cssStyles}</style>
</head>
<body>
  <div class="header-bar">
    FinBootcamp — Proyecto Final | Analista de Sistemas de Información | Agosto 2026
  </div>
  ${htmlBody}
</body>
</html>`;
  
  fs.writeFileSync(htmlPath, fullHtml, 'utf-8');
  console.log(`✅ Generado: ${file.replace('.md', '.html')}`);
}

console.log('\\n📄 Archivos HTML generados. Abrí cada uno en el navegador y usá Ctrl+P → Guardar como PDF');
console.log('📂 Ubicación:', docsDir);
