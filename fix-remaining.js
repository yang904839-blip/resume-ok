import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, 'src/components/templates');

function fixRemainingIssues(templateNumber) {
  const filePath = path.join(templatesDir, `Template${templateNumber}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix the conditional checks that lost the ?
  content = content.replace(/\{profile\.mobile &&/g, '{profile?.mobile &&');
  content = content.replace(/\{profile\.mobile\}/g, '{profile?.mobile}');
  content = content.replace(/\{profile\.workPlace &&/g, '{profile?.workPlace &&');
  content = content.replace(/\{profile\.workPlace\}/g, '{profile?.workPlace}');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Fixed remaining issues in Template${templateNumber}.tsx`);
}

// Fix templates 12-40
for (let i = 12; i <= 40; i++) {
  fixRemainingIssues(i);
}

console.log('\nAll remaining issues fixed!');
