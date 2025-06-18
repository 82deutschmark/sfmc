/**
 * Grid Format Adapter Service
 * 
 * This service handles conversion between ARC-AGI integer grids (0-9) and emoji grids.
 * It provides utilities for detecting grid format and transforming between formats.
 * 
 * Author: Cascade
 * Created: 2025-06-17
 */

import { SPACE_EMOJIS } from '../../client/src/constants/spaceEmojis.js';
import type { EmojiSet } from '../../client/src/constants/spaceEmojis.js';
import type { Task } from '../../shared/schema.js';

export class GridFormatAdapter {
  /**
   * Detects if a grid is using ARC-AGI integer format (0-9) or emoji format
   * @param grid The grid to analyze
   * @returns true if grid contains integers, false if it contains emojis
   */
  static isIntegerGrid(grid: any[][]): boolean {
    if (!grid || !grid.length) return false;
    
    // Check the first cell to determine format
    const firstCell = grid[0][0];
    return typeof firstCell === 'number' || (typeof firstCell === 'string' && !isNaN(Number(firstCell)));
  }

  /**
   * Converts an ARC-AGI integer grid to an emoji grid using the specified emoji set
   * @param grid A grid containing integer values 0-9
   * @param emojiSet The emoji set to use for conversion
   * @returns A grid with integers replaced by corresponding emojis
   */
  static integerGridToEmojiGrid(grid: (number|string)[][], emojiSet: EmojiSet): string[][] {
    if (!grid || !grid.length) return [[]];
    
    const emojis = SPACE_EMOJIS[emojiSet];
    
    return grid.map(row => 
      row.map(cell => {
        const index = typeof cell === 'string' ? parseInt(cell, 10) : cell;
        
        // Ensure index is within bounds of our emoji set
        if (isNaN(index) || index < 0 || index >= emojis.length) {
          console.warn(`Invalid cell value ${cell} in grid. Using default (0) emoji.`);
          return emojis[0]; // Default to first emoji
        }
        
        return emojis[index];
      })
    );
  }

  // Note: We do not need emoji-to-integer conversion as we're only handling integer input files
  // and converting them to emojis for rendering

  /**
   * Processes a task to ensure all grid data is in emoji format for UI rendering
   * Handles both integer-format and emoji-format tasks
   * @param task The task to process
   * @returns A task with all grids in emoji format
   */
  static processTaskForRendering(task: Task): Task {
    const emojiSet = task.emojiSet || 'status_main';
    const processedTask = { ...task };

    // Process examples
    if (task.examples && Array.isArray(task.examples)) {
      processedTask.examples = task.examples.map((example: {input: any[][], output: any[][]}) => {
        const processedExample = { ...example };
        
        // Process input grid if it exists and is in integer format
        if (example.input && this.isIntegerGrid(example.input)) {
          processedExample.input = this.integerGridToEmojiGrid(example.input, emojiSet);
        }
        
        // Process output grid if it exists and is in integer format
        if (example.output && this.isIntegerGrid(example.output)) {
          processedExample.output = this.integerGridToEmojiGrid(example.output, emojiSet);
        }
        
        return processedExample;
      });
    }

    // Process test input grid if it exists and is in integer format
    if (task.testInput && this.isIntegerGrid(task.testInput)) {
      processedTask.testInput = this.integerGridToEmojiGrid(task.testInput, emojiSet);
    }

    // Process test output grid if it exists and is in integer format
    if (task.testOutput && this.isIntegerGrid(task.testOutput)) {
      processedTask.testOutput = this.integerGridToEmojiGrid(task.testOutput, emojiSet);
    }

    return processedTask;
  }

  /**
   * Process ARC-AGI format (train/test) to the app's task format
   * @param arcData The ARC-AGI format data with train/test arrays
   * @param options Optional fields to include in the generated task
   * @returns A task object compatible with the app
   */
  static processArcAgiFormat(arcData: {train: any[], test: any[]}, options: Partial<Task> = {}): Task {
    const id = options.id || `ARC-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const emojiSet = options.emojiSet || 'status_main';
    const examples: {input: string[][], output: string[][]}[] = [];
    
    // Process training examples
    if (arcData.train && Array.isArray(arcData.train)) {
      for (const example of arcData.train) {
        if (example.input && example.output) {
          examples.push({
            input: this.integerGridToEmojiGrid(example.input, emojiSet),
            output: this.integerGridToEmojiGrid(example.output, emojiSet)
          });
        }
      }
    }
    
    // Process test examples (use the first one as the test)
    let testInput: string[][] = [[]];
    let testOutput: string[][] = [[]];
    
    if (arcData.test && Array.isArray(arcData.test) && arcData.test.length > 0) {
      const firstTest = arcData.test[0];
      if (firstTest.input) {
        testInput = this.integerGridToEmojiGrid(firstTest.input, emojiSet);
      }
      if (firstTest.output) {
        testOutput = this.integerGridToEmojiGrid(firstTest.output, emojiSet);
      }
    }

    // Determine grid size from examples
    let gridSize = 3; // Default
    if (examples.length > 0 && examples[0].input && examples[0].input.length > 0) {
      gridSize = examples[0].input.length;
    }

    // Create the task
    return {
      id,
      title: options.title || `ARC Challenge ${id}`,
      description: options.description || 'Solve this Abstract Reasoning Challenge.',
      category: options.category || '🧩 ARC Challenge',
      difficulty: options.difficulty || 'Intermediate',
      gridSize,
      timeLimit: options.timeLimit || null,
      basePoints: options.basePoints || 500,
      requiredRankLevel: options.requiredRankLevel || 1,
      emojiSet,
      examples,
      testInput,
      testOutput,
      hints: options.hints || ['Study the patterns carefully.']
    };
  }
}
