const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcPath = path.join(__dirname, '..', '..', 'src', 'components', 'portfolio', 'data.ts');
const outPath = path.join(__dirname, '..', 'data.seed.json');

if (!fs.existsSync(srcPath)) {
  console.error('frontend data.ts not found at', srcPath);
  process.exit(1);
}

let src = fs.readFileSync(srcPath, 'utf8');

// Remove TypeScript type declarations (simple heuristics)
src = src.replace(/export type[\s\S]*?};/g, '');
// Turn exports into plain const
src = src.replace(/export\s+const/g, 'const');
// Remove simple const type annotations like `: Type[]` -> keep the identifier
src = src.replace(/const\s+([A-Z0-9_]+)\s*:\s*[^==]+=/g, 'const $1 =');

// Append an export to return DEFAULT_DATA
src += '\nmodule.exports = DEFAULT_DATA;\n';

try {
  const script = new vm.Script(src, { filename: 'data.ts' });
  const context = { module: { exports: {} }, exports: {} , console };
  vm.createContext(context);
  script.runInContext(context);
  const result = context.module.exports || context.exports || null;

  if (!result) {
    console.error('DEFAULT_DATA not found after evaluation');
    process.exit(1);
  }

  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('Wrote seed JSON to', outPath);
} catch (err) {
  console.error('Error building seed:', err);
  process.exit(1);
}
