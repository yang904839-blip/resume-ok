import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, 'src/components/templates');

// Field mapping rules
const fieldMappings = [
  // Profile fields
  { old: 'profile?.title', new: 'profile?.positionTitle' },
  { old: 'profile.title', new: 'profile.positionTitle' },
  { old: 'profile?.phone', new: 'profile?.mobile' },
  { old: 'profile.phone', new: 'profile.mobile' },
  { old: 'profile?.location', new: 'profile?.workPlace' },
  { old: 'profile.location', new: 'profile.workPlace' },
  
  // Education fields
  { old: 'edu.startDate', new: 'edu.edu_time?.[0]' },
  { old: 'edu.endDate', new: 'edu.edu_time?.[1]' },
  
  // Work experience fields
  { old: 'work.position', new: 'work.department_name' },
  { old: 'work.company', new: 'work.company_name' },
  { old: 'work.startDate', new: 'work.work_time?.[0]' },
  { old: 'work.endDate', new: 'work.work_time?.[1]' },
  { old: 'work.description', new: 'work.work_desc' },
  
  // Project fields
  { old: 'proj.name', new: 'proj.project_name' },
  { old: 'proj.startDate', new: 'proj.project_time?.[0]' },
  { old: 'proj.endDate', new: 'proj.project_time?.[1]' },
  { old: 'proj.description', new: 'proj.project_desc' },
  
  // Skills fields
  { old: 'skill.name', new: 'skill.skill_name' },
  
  // Awards fields
  { old: 'award.name', new: 'award.award_info' },
  { old: 'award.date', new: 'award.award_time' },
];

function fixTemplate(templateNumber) {
  const filePath = path.join(templatesDir, `Template${templateNumber}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Template${templateNumber}.tsx not found, skipping...`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Step 1: Replace imports and interface
  const importRegex = /import type \{ ResumeConfig, ThemeConfig \} from '\.\.\/\.\.\/types';[\s\S]*?const Template\d+ = \(\{ data, theme \}: Template\d+Props\) => \{\s*const \{ profile, education = \[\], workExperience = \[\], projectExperience = \[\], skills = \[\], awards = \[\], aboutMe \} = data;/;
  
  const newImport = `import React from 'react';
import { useResumeStore } from '@/store';

const Template${templateNumber}: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || {};
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';`;
  
  content = content.replace(importRegex, newImport);
  
  // Step 2: Apply field mappings
  fieldMappings.forEach(({ old, new: newField }) => {
    // Use regex to replace field references
    const regex = new RegExp(`\\{${old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\}`, 'g');
    content = content.replace(regex, `{${newField}}`);
  });
  
  // Step 3: Remove edu.description references (since we don't have this field)
  content = content.replace(/\s*\{edu\.description && <p[^>]*>\{edu\.description\}<\/p>\}/g, '');
  
  // Write the fixed content back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Fixed Template${templateNumber}.tsx`);
}

// Fix templates 15-40
for (let i = 15; i <= 40; i++) {
  fixTemplate(i);
}

console.log('\nAll templates fixed!');
