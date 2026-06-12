const fs = require('fs');
const path = require('path');

const mappings = [
  { match: /(?<![:a-zA-Z0-9-])bg-white(?![-a-zA-Z0-9\/])/g, replace: 'bg-white dark:bg-brand-secondary transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])text-brand-primary(?![-a-zA-Z0-9\/])/g, replace: 'text-brand-primary dark:text-white transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])bg-brand-light(?![-a-zA-Z0-9\/])/g, replace: 'bg-brand-light dark:bg-brand-primary transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])bg-brand-muted(?![-a-zA-Z0-9\/])/g, replace: 'bg-brand-muted dark:bg-[#1a2533] transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])text-brand-dark(?![-a-zA-Z0-9\/])/g, replace: 'text-brand-dark dark:text-brand-light/70 transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])text-brand-secondary(?![-a-zA-Z0-9\/])/g, replace: 'text-brand-secondary dark:text-brand-light transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])border-brand-dark(?![-a-zA-Z0-9\/])/g, replace: 'border-brand-dark dark:border-white/10 transition-colors' },
  { match: /(?<![:a-zA-Z0-9-])border-brand-muted(?![-a-zA-Z0-9\/])/g, replace: 'border-brand-muted dark:border-white/5 transition-colors' }
];

function applyMappings(content) {
  let newContent = content;
  for (const { match, replace } of mappings) {
    newContent = newContent.replace(match, replace);
  }
  // Deduplicate transition-colors if it appears multiple times
  newContent = newContent.replace(/(transition-colors\s*){2,}/g, 'transition-colors ');
  return newContent;
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      if (['ThemeToggle.tsx', 'NovaaLogo.tsx', 'App.tsx', 'ThemeContext.tsx'].includes(file)) continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      content = applyMappings(content);
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('Dark mode classes applied.');
