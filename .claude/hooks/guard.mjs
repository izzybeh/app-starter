// Safety guard for beginners, run by Claude Code before every shell command.
// Blocks: force-pushing, saving .env (secrets) files to GitHub, and pushing
// straight to main once /setup-quality has protected it.
// Written in Node.js so it works the same on Mac and Windows.
import { execFileSync } from 'node:child_process';

const SECRET_FILE = /(^|[\\/])\.env(\.(?!example$)[^\\/\s]+)?$/i;

const deny = (reason) => {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason,
    },
  }));
  process.exit(0);
};

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

const command = String(input?.tool_input?.command ?? '');
if (!command.trim()) process.exit(0);
const cwd = input?.cwd || process.cwd();

const git = (...args) => {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

// Split a command line into simple commands (on ; && || | and newlines).
const segments = command.split(/;|&&|\|\||\||\r?\n/).map((s) => s.trim()).filter(Boolean);
const words = (s) => (s.match(/"[^"]*"|'[^']*'|\S+/g) || []).map((w) => w.replace(/^["']|["']$/g, ''));

for (const seg of segments) {
  const w = words(seg);
  const gi = w.findIndex((x) => x === 'git' || /[\\/]git(\.exe)?$/i.test(x));
  if (gi === -1) continue;
  // Skip global options like -C <dir> to find the git subcommand.
  let i = gi + 1;
  while (i < w.length && w[i].startsWith('-')) i += (w[i] === '-C' || w[i] === '-c') ? 2 : 1;
  const sub = w[i];
  const rest = w.slice(i + 1);

  if (sub === 'add') {
    const named = rest.filter((x) => !x.startsWith('-'));
    if (named.some((x) => SECRET_FILE.test(x))) {
      deny('That file holds secret keys (.env). It must never be saved to GitHub. Keep it out of commits; .gitignore should already cover it.');
    }
  }

  if (sub === 'commit' || sub === 'push') {
    const staged = git('diff', '--cached', '--name-only').split(/\r?\n/).filter(Boolean);
    const tracked = git('ls-files').split(/\r?\n/).filter(Boolean);
    const leaked = [...new Set([...staged, ...tracked])].filter((f) => SECRET_FILE.test(f));
    if (leaked.length) {
      deny(`A secrets file is about to be saved to GitHub: ${leaked.join(', ')}. Remove it from Git with "git rm --cached <file>", make sure .gitignore covers .env files, and explain this to the person before trying again.`);
    }
  }

  if (sub === 'push') {
    if (rest.some((x) => x === '--force' || x === '-f' || x.startsWith('--force-with-lease') || /^\+/.test(x) || /^-[a-zA-Z]*f/.test(x) && !x.startsWith('--'))) {
      deny('Force-pushing can erase saved work, so this project blocks it. Explain the situation to the person and find a safe alternative.');
    }

    // Is main protected? Only once .claude/main-protected is on GitHub's main.
    const protectedOnRemote = git('ls-tree', '--name-only', 'origin/main', '--', '.claude/main-protected') !== '';
    if (protectedOnRemote) {
      const args = rest.filter((x) => !x.startsWith('-'));
      const refspecs = args.slice(1); // first non-option argument is the remote
      const current = git('rev-parse', '--abbrev-ref', 'HEAD');
      const targetsMain = refspecs.length
        ? refspecs.some((r) => /(^|:|\/)(main|master)$/.test(r) || r === 'HEAD' && /^(main|master)$/.test(current))
        : /^(main|master)$/.test(current) || rest.includes('--all') || rest.includes('--mirror');
      if (targetsMain) {
        deny('The main branch is protected: changes reach it only through a pull request. Put this work on a feature branch, then use /ship-story and /merge-story.');
      }
    }
  }
}

process.exit(0);
