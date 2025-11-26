import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEARNERS_DIR = path.join(__dirname, '../learners');
const README_PATH = path.join(__dirname, '../README.md');

// Read all markdown files from learners directory
function getLearners() {
  const learners = [];
  const files = fs.readdirSync(LEARNERS_DIR);
  
  for (const file of files) {
    // Skip README.md in learners directory
    if (file === 'README.md' || !file.endsWith('.md')) {
      continue;
    }
    
    const filePath = path.join(LEARNERS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
    
    if (content.length >= 3) {
      const name = content[0].trim();
      const emoji = content[1].trim();
      const githubUrl = content[2].trim();
      
      // Extract username from GitHub URL
      const username = githubUrl.replace('https://github.com/', '').replace(/\/$/, '');
      
      learners.push({ name, emoji, username });
    }
  }
  
  // Sort learners alphabetically by name (case-insensitive)
  learners.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  
  return learners;
}

// Update README.md with the learners list
function updateReadme() {
  const learners = getLearners();
  let readme = fs.readFileSync(README_PATH, 'utf-8');
  
  // Create the contributors list
  const contributorsList = learners
    .map(learner => `- [${learner.name}](https://github.com/${learner.username}) ${learner.emoji}`)
    .join('\n');
  
  // Find and replace the section between "Thanks to participants and learners!" and the end
  const startMarker = '#### Thanks to participants and learners!';
  const startIndex = readme.indexOf(startMarker);
  
  if (startIndex === -1) {
    console.error('Could not find the "Thanks to participants and learners!" section in README.md');
    process.exit(1);
  }
  
  // Find the end of the file or next major section
  const afterStart = readme.substring(startIndex);
  const nextSectionMatch = afterStart.match(/\n#{1,4} [^#]/);
  
  let endIndex;
  if (nextSectionMatch) {
    endIndex = startIndex + nextSectionMatch.index;
  } else {
    endIndex = readme.length;
  }
  
  // Build the new section
  const newSection = `${startMarker}\n\n${contributorsList}\n`;
  
  // Replace the section
  const updatedReadme = readme.substring(0, startIndex) + newSection + readme.substring(endIndex);
  
  // Write back to README.md
  fs.writeFileSync(README_PATH, updatedReadme.trimEnd() + '\n');
  
  console.log(`✅ Updated README.md with ${learners.length} contributor(s)`);
  console.log('Contributors:', learners.map(l => l.name).join(', '));
}

// Run the update
try {
  updateReadme();
} catch (error) {
  console.error('Error updating README:', error);
  process.exit(1);
}
