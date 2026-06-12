const fs = require('fs');
const path = require('path');

// These are targeted surgical replacements for dark mode text legibility.
// We leave all existing dark: classes in place and only add missing ones.
const fixes = [
  // Secondary text (brand-secondary = #374151 grey) — invisible on dark bg
  // Add dark:text-white/70 wherever text-brand-secondary is used WITHOUT an existing dark: override
  {
    match: /className="([^"]*?)text-brand-secondary\/80([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-secondary/80 dark:text-white/70${after}"`
  },
  {
    match: /className="([^"]*?)text-brand-secondary\/70([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-secondary/70 dark:text-white/60${after}"`
  },
  {
    match: /className="([^"]*?)text-brand-secondary\/60([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-secondary/60 dark:text-white/50${after}"`
  },
  {
    match: /className="([^"]*?)\btext-brand-secondary\b([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-secondary dark:text-white/80${after}"`
  },
  // brand-primary/70 used as muted text
  {
    match: /className="([^"]*?)text-brand-primary\/70([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-primary/70 dark:text-white/60${after}"`
  },
  {
    match: /className="([^"]*?)text-brand-primary\/80([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-primary/80 dark:text-white/70${after}"`
  },
  {
    match: /className="([^"]*?)text-brand-primary\/60([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-primary/60 dark:text-white/50${after}"`
  },
  {
    match: /className="([^"]*?)text-brand-primary\/50([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-primary/50 dark:text-white/40${after}"`
  },
  {
    match: /className="([^"]*?)text-brand-primary\/40([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-primary/40 dark:text-white/30${after}"`
  },
  // Plain text-brand-primary without dark: override
  {
    match: /className="([^"]*?)\btext-brand-primary\b([^"]*?)"/g,
    check: (m) => !m.includes('dark:text-'),
    replace: (m, before, after) => `className="${before}text-brand-primary dark:text-white${after}"`
  },
  // bg-brand-muted without dark: override — used as light surface
  {
    match: /className="([^"]*?)\bbg-brand-muted\b([^"]*?)"/g,
    check: (m) => !m.includes('dark:bg-'),
    replace: (m, before, after) => `className="${before}bg-brand-muted dark:bg-brand-surface${after}"`
  },
  // bg-brand-light without dark: override
  {
    match: /className="([^"]*?)\bbg-brand-light\b([^"]*?)"/g,
    check: (m) => !m.includes('dark:bg-'),
    replace: (m, before, after) => `className="${before}bg-brand-light dark:bg-brand-navy${after}"`
  },
  // bg-white without dark: override — card surfaces
  {
    match: /className="([^"]*?)\bbg-white\b([^"]*?)"/g,
    check: (m) => !m.includes('dark:bg-'),
    replace: (m, before, after) => `className="${before}bg-white dark:bg-brand-primary${after}"`
  },
  // border-brand-dark without dark: override
  {
    match: /className="([^"]*?)\bborder-brand-dark\b([^"]*?)"/g,
    check: (m) => !m.includes('dark:border-'),
    replace: (m, before, after) => `className="${before}border-brand-dark dark:border-white/10${after}"`
  },
];

const SKIP_FILES = ['ThemeToggle.tsx', 'ThemeContext.tsx', 'NovaaLogo.tsx', 'App.tsx', 'index.css'];

function processFile(filePath) {
  if (SKIP_FILES.includes(path.basename(filePath))) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const fix of fixes) {
    content = content.replace(fix.match, (match, ...args) => {
      if (fix.check(match)) {
        return fix.replace(match, ...args);
      }
      return match;
    });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', path.relative(process.cwd(), filePath));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.tsx') || full.endsWith('.jsx')) {
      processFile(full);
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('Done.');
