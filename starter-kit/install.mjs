// Installs the usability kit into a freshly created Next.js app:
// building blocks, theme system, stricter lint rules and formatting.
// Run from the project folder:
//   node starter-kit/install.mjs --name "App name" --description "One sentence."
import { execSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const kit = dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const arg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const say = (m) => console.log(`• ${m}`);
const fail = (m) => {
  console.error(`Stopped: ${m}`);
  process.exit(1);
};

if (!existsSync(join(root, 'package.json')) || !existsSync(join(root, 'src', 'app'))) {
  fail('run this from the project folder after the Next.js app has been created (package.json and src/app are missing).');
}
if (existsSync(join(root, 'src', 'components', 'ui', 'button.tsx')) && !process.argv.includes('--force')) {
  fail('the kit is already installed. To change the look, edit theme.json and run: npm run theme');
}

const name = (arg('--name') || 'My App').trim();
const description = (arg('--description') || '').trim();

// 1. Building blocks, layout, error pages, lint and format settings.
cpSync(join(kit, 'files'), root, { recursive: true, force: true });
say('Copied the building blocks into src/ (components, patterns, helpers, style guide).');
mkdirSync(join(root, 'docs'), { recursive: true });
cpSync(join(kit, 'README.md'), join(root, 'docs', 'USABILITY-KIT.md'));

const sitePath = join(root, 'src', 'config', 'site.ts');
writeFileSync(
  sitePath,
  readFileSync(sitePath, 'utf8')
    .replace('__APP_NAME__', name.replace(/["\\]/g, ''))
    .replace('__APP_DESCRIPTION__', description.replace(/["\\]/g, '')),
);

// 2. Theme system.
mkdirSync(join(root, 'scripts'), { recursive: true });
cpSync(join(kit, 'scripts', 'apply-theme.mjs'), join(root, 'scripts', 'apply-theme.mjs'));
cpSync(join(kit, 'themes', 'presets.json'), join(root, 'scripts', 'theme-presets.json'));
if (!existsSync(join(root, 'theme.json'))) {
  writeFileSync(join(root, 'theme.json'), JSON.stringify({ base: 'calm', name: 'Calm' }, null, 2) + '\n');
  say('No theme.json found, so using the Calm theme. Change it any time.');
}

// 3. Scripts.
const pkgPath = join(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.scripts = {
  ...pkg.scripts,
  theme: 'node scripts/apply-theme.mjs',
  typecheck: 'tsc --noEmit',
  format: 'prettier --write .',
  'format:check': 'prettier --check .',
};
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// 4. Packages.
const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });
say('Installing packages…');
run('npm install --no-audit --no-fund @radix-ui/react-dialog sonner clsx tailwind-merge');
run('npm install --no-audit --no-fund --save-dev prettier prettier-plugin-tailwindcss eslint-plugin-jsx-a11y');

// 5. Apply the theme and tidy formatting.
run('node scripts/apply-theme.mjs');
run('npx prettier --write . --log-level warn');

say(`Done. The app now uses the kit. See it all at /style-guide.`);
