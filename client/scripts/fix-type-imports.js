#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the list of TypeScript files
const tsFiles = execSync(
  'find . -type f -name "*.ts" -o -name "*.tsx" | grep -v "node_modules" | grep -v ".expo" | grep -v "android" | grep -v "ios" | grep -v "dist" | grep -v "build" | grep -v "app-example"',
  { encoding: 'utf8' }
)
  .trim()
  .split('\n');

// Regular expressions for finding imports
const typeImportRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]@type(?:s)?\/([^'"]+)['"]/g;

// Process each file
let filesChanged = 0;
let importsFixed = 0;

tsFiles.forEach((filePath) => {
  if (!filePath.trim()) return;

  const fullPath = path.resolve(__dirname, '..', filePath);

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    let fileImportsFixed = 0;
    // Replace @type/ with @models/
    const newContent = content.replace(typeImportRegex, (match, importPath) => {
      const newMatch = match.replace(/@type(?:s)?\//, '@models/');
      fileImportsFixed++;
      importsFixed++;
      return newMatch;
    });

    // Only write to the file if changes were made
    if (newContent !== content) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
      filesChanged++;
      console.log(`✅ Fixed ${fileImportsFixed} imports in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\nSummary: Fixed ${importsFixed} imports in ${filesChanged} files.`);
