/**
 * Task JSON Standardization Script - Improved Version
 * 
 * This script properly updates task files to:
 * 1. Ensure timeLimit is set to null
 * 2. Convert emoji grids to numeric grids (1-9) for tech_set1 and tech_set2
 * 3. Avoid using 0 (black square) for better visual appeal
 * 4. Replace unknown emojis with 1 instead of 0
 * 
 * Author: Cascade
 * Created: 2025-06-17
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to tasks directory
const TASKS_DIR = path.join(__dirname, 'server', 'data', 'tasks');

// Emoji mappings for conversion - with special attention to tech_set1 and tech_set2
const EMOJI_SETS = {
  tech_set1: {
    // For tech_set1
    '⬛': 0,  // Black square (avoid in easy puzzles)
    '⚡': 2,  // Lightning bolt
    '🔋': 3,  // Battery
    '🔌': 4,  // Electric plug
    '⛽': 5,  // Fuel pump
    '☢️': 6,  // Radioactive
    '⚛️': 7,  // Atom symbol
    '🔗': 8,  // Link
    '⚙️': 9,  // Gear
    '🔧': 1,  // Wrench
    
    // Additional emojis found in tech_set1 tasks
    '📡': 2,  // Satellite dish
    '📱': 3,  // Mobile phone
    '🖥️': 2,  // Desktop computer
    '🛩️': 4,  // Small airplane
    '⌨️': 5,  // Keyboard
    '🔭': 6   // Telescope
  },
  
  tech_set2: {
    // For tech_set2
    '⬛': 0,   // Black square (avoid in easy puzzles)
    '📡': 2,   // Satellite dish
    '🛰️': 3,   // Satellite
    '📞': 4,   // Telephone
    '📱': 5,   // Mobile phone
    '⌨️': 6,   // Keyboard
    '📶': 7,   // Antenna bars
    '📋': 8,   // Clipboard
    '💻': 9,   // Laptop
    '🎚️': 1,   // Level slider
    '🎧': 2,   // Headphone
    
    // Additional emojis found in tech_set2 tasks
    '🖱️': 3,   // Computer mouse
    '📺': 4,   // Television
    '🔋': 5,   // Battery
    '⚡': 6,    // Lightning bolt
    '🎛️': 7,   // Control knobs
    '⚙️': 8,    // Gear
    '🔨': 9,    // Hammer
    '🛠️': 1,    // Hammer and wrench
    '⚛️': 2     // Atom symbol
  }
};

// Default mapping for unknown emojis - avoid 0 (black square)
const DEFAULT_VALUE = 1;

/**
 * Convert an emoji grid to a numeric grid based on emoji set
 * @param {Array<Array<string>>} grid - The emoji grid to convert
 * @param {string} emojiSet - The name of the emoji set
 * @returns {Array<Array<number>>} - The numeric grid
 */
function emojiGridToNumericGrid(grid, emojiSet) {
  if (!grid || !grid.length) return [[]];
  
  const emojiMap = EMOJI_SETS[emojiSet];
  if (!emojiMap) {
    console.warn(`Unknown emoji set: ${emojiSet}`);
    return grid;
  }

  return grid.map(row => 
    row.map(cell => {
      const value = emojiMap[cell];
      if (value === undefined) {
        console.warn(`Unknown emoji in ${emojiSet}: ${cell}. Using alternative value (${DEFAULT_VALUE}).`);
        return DEFAULT_VALUE;
      }
      return value;
    })
  );
}

/**
 * Update a task file to ensure timeLimit is null and convert emoji grids to numeric
 * @param {Object} task - The task data
 * @returns {Object} - The updated task
 */
function updateTask(task) {
  // Create a copy to avoid modifying the original
  const updatedTask = { ...task };
  
  // Ensure timeLimit is null
  updatedTask.timeLimit = null;
  
  // Only convert emoji grids for tech_set1 and tech_set2
  if (task.emojiSet === 'tech_set1' || task.emojiSet === 'tech_set2') {
    // Process examples
    if (task.examples && Array.isArray(task.examples)) {
      updatedTask.examples = task.examples.map(example => ({
        input: emojiGridToNumericGrid(example.input, task.emojiSet),
        output: emojiGridToNumericGrid(example.output, task.emojiSet)
      }));
    }
    
    // Process test input/output
    if (task.testInput) {
      updatedTask.testInput = emojiGridToNumericGrid(task.testInput, task.emojiSet);
    }
    if (task.testOutput) {
      updatedTask.testOutput = emojiGridToNumericGrid(task.testOutput, task.emojiSet);
    }
  }
  
  return updatedTask;
}

/**
 * Process specified task files
 * @param {Array<string>} targetFiles - List of task file names to process
 */
async function processTaskFiles(targetFiles) {
  try {
    console.log(`Processing ${targetFiles.length} task files...`);
    const techSetTasks = [];
    const nonTimeNullTasks = [];
    
    // Process each file
    for (const file of targetFiles) {
      const filePath = path.join(TASKS_DIR, file);
      
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const task = JSON.parse(fileContent);
        
        // Track task types for reporting
        if (task.emojiSet === 'tech_set1' || task.emojiSet === 'tech_set2') {
          techSetTasks.push(file);
        }
        if (task.timeLimit !== null) {
          nonTimeNullTasks.push(file);
        }
        
        // Update the task
        const updatedTask = updateTask(task);
        
        // Write back to file with nice formatting
        await fs.writeFile(filePath, JSON.stringify(updatedTask, null, 2), 'utf-8');
        console.log(`✓ Updated ${file}`);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
    
    // Report on what was done
    console.log('\nTask Update Summary:');
    console.log(`- Total files processed: ${targetFiles.length}`);
    console.log(`- Tech set tasks converted to numeric: ${techSetTasks.length}`);
    console.log(`- Tasks with non-null timeLimit updated: ${nonTimeNullTasks.length}`);
    
    if (techSetTasks.length > 0) {
      console.log('\nTech set tasks safely converted:');
      console.log(techSetTasks.join(', '));
    }
    
    if (nonTimeNullTasks.length > 0) {
      console.log('\nTasks with timeLimit set to null:');
      console.log(nonTimeNullTasks.join(', '));
    }
    
    console.log('\nAll specified tasks updated successfully!');

  } catch (error) {
    console.error('Error processing task files:', error);
  }
}

// File list to process (as specified by user)
const targetFiles = [
  'COM-001.json', 'COM-002.json', 'COM-003.json', 'COM-004.json', 
  'COM-005.json', 'COM-006.json', 'COM-007.json', 
  'FS-001.json', 'FS-002.json', 'FS-003.json', 'FS-004.json',
  'FS-005.json', 'FS-006.json', 'FS-007.json', 'FS-008.json',
  'FS-009.json', 'FS-010.json'
];

// Run the script
processTaskFiles(targetFiles);
