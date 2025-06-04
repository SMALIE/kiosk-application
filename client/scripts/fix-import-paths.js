#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the list of TypeScript files with imports to fix
const tsFiles = execSync(
  'find . -type f -name "*.ts" -o -name "*.tsx" | grep -v "node_modules" | grep -v ".expo" | grep -v "android" | grep -v "ios" | grep -v "dist" | grep -v "build"',
  { encoding: 'utf8' }
)
  .trim()
  .split('\n');

// Regular expressions for finding imports
const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"](@\/[^'"]+)['"]/g;

// Path mappings from tsconfig.json
const tsconfigRaw = fs.readFileSync(path.resolve(__dirname, '../tsconfig.json'), 'utf8');
const tsconfig = JSON.parse(tsconfigRaw);
const pathMappings = tsconfig.compilerOptions.paths;

// Extract the prefixes
const prefixes = Object.keys(pathMappings)
  .filter((key) => key !== '@/*')
  .map((key) => key.replace('/*', ''));

// Process each file
let filesChanged = 0;
let importsFixed = 0;

tsFiles.forEach((filePath) => {
  if (!filePath.trim()) return;

  const fullPath = path.resolve(__dirname, '..', filePath);

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    let fileImportsFixed = 0;

    // Replace @/folder/file with @folder/file for each path mapping
    const newContent = content.replace(importRegex, (match, importPath) => {
      // Skip if it's not starting with @/
      if (!importPath.startsWith('@/')) return match;

      // Get the path after @/
      const restPath = importPath.substring(2);
      const firstFolder = restPath.split('/')[0];

      // Find if we have a path mapping for this folder
      for (const prefix of prefixes) {
        const prefixFolder = prefix.replace('@', '');
        if (prefixFolder === firstFolder) {
          // Replace @/folder with @folder
          const newImportPath = importPath.replace(`@/${firstFolder}`, `@${firstFolder}`);
          const newMatch = match.replace(importPath, newImportPath);
          fileImportsFixed++;
          importsFixed++;
          return newMatch;
        }
      }

      return match;
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
