/**
 * Task JSON Standardization Script
 * 
 * This script updates all task files to:
 * 1. Ensure timeLimit is set to null
 * 2. Convert emoji grids to numeric grids (0-9) for tech_set1 and tech_set2
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

// Emoji mappings for conversion
const EMOJI_SETS = {
  tech_set1: ['⬛', '⚡', '🔋', '🔌', '⛽', '☢️', '⚛️', '🔗', '⚙️', '🔧'],
  tech_set2: ['⬛', '📡', '🛰️', '📞', '📱', '⌨️', '📶', '📋', '💻', '🎚️', '🎧']
};

/**
 * Convert an emoji grid to a numeric grid based on emoji set
 * @param {Array<Array<string>>} grid - The emoji grid to convert
 * @param {string} emojiSet - The name of the emoji set
 * @returns {Array<Array<number>>} - The numeric grid
 */
function emojiGridToNumericGrid(grid, emojiSet) {
  if (!grid || !grid.length) return [[]];
  
  const emojiArray = EMOJI_SETS[emojiSet];
  if (!emojiArray) {
    console.warn(`Unknown emoji set: ${emojiSet}`);
    return grid;
  }

  return grid.map(row => 
    row.map(cell => {
      const index = emojiArray.indexOf(cell);
      if (index === -1) {
        console.warn(`Unknown emoji in ${emojiSet}: ${cell}. Using default (0).`);
        return 0;
      }
      return index;
    })
  );
}

/**
 * Update a task file to ensure timeLimit is null and convert emoji grids to numeric for tech sets
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
 * Process all task files in the tasks directory
 */
async function processAllTaskFiles() {
  try {
    // Get all JSON files in the tasks directory
    const files = await fs.readdir(TASKS_DIR);
    const taskFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`Processing ${taskFiles.length} task files...`);
    const techSetTasks = [];
    const nonTimeNullTasks = [];
    
    // Process each file
    for (const file of taskFiles) {
      const filePath = path.join(TASKS_DIR, file);
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
    }
    
    // Report on what was done
    console.log('\nTask Update Summary:');
    console.log(`- Total files processed: ${taskFiles.length}`);
    console.log(`- Tech set tasks converted to numeric: ${techSetTasks.length}`);
    console.log(`- Tasks with non-null timeLimit updated: ${nonTimeNullTasks.length}`);
    
    if (techSetTasks.length > 0) {
      console.log('\nTech set tasks converted:');
      console.log(techSetTasks.join(', '));
    }
    
    if (nonTimeNullTasks.length > 0) {
      console.log('\nTasks with timeLimit set to null:');
      console.log(nonTimeNullTasks.join(', '));
    }
    
    console.log('\nAll tasks updated successfully!');

  } catch (error) {
    console.error('Error processing task files:', error);
  }
}

// Run the script
processAllTaskFiles();
