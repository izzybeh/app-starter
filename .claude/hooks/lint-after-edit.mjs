// After Claude edits a code file, run ESLint on just that file and report
// problems back to Claude so it fixes them right away.
// Does nothing until the app exists (no package.json or node_modules yet).
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, isAbsolute } from 'node:path';

const read = () => new Promise((resolve) => {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (d) => { raw += d; });
  process.stdin.on('end', () => resolve(raw));
  process.stdin.on('error', () => resolve(''));
});

const raw = await read();
let input;
try { input = JSON.parse(raw); } catch { process.exit(0); }

const root = process.env.CLAUDE_PROJECT_DIR || input?.cwd || process.cwd();
let file = String(input?.tool_input?.file_path ?? '');
if (!file || !/\.(ts|tsx|js|jsx|mjs|cjs)$/i.test(file)) process.exit(0);
if (!isAbsolute(file)) file = join(root, file);
if (/[\\/](node_modules|\.next|\.claude)[\\/]/.test(file)) process.exit(0);

const eslintBin = join(root, 'node_modules', 'eslint', 'bin', 'eslint.js');
if (!existsSync(join(root, 'package.json')) || !existsSync(eslintBin)) process.exit(0);
try {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  if (!pkg?.scripts?.lint) process.exit(0);
} catch {
  process.exit(0);
}

try {
  execFileSync(process.execPath, [eslintBin, '--no-warn-ignored', file], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 60000,
  });
  process.exit(0);
} catch (err) {
  const out = `${err?.stdout ?? ''}${err?.stderr ?? ''}`.trim();
  if (!out) process.exit(0); // ESLint itself failed to run; don't block work.
  process.stderr.write(`Lint problems in ${file}:\n${out.slice(0, 3000)}\nFix these before moving on.`);
  process.exit(2);
}
