// Node.js imports (for use with Node.js runtime)
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Task, InsertTask } from '../../shared/schema';
import { EMBEDDED_TASKS } from '../data/taskData.js';
import { GridFormatAdapter } from './gridFormatAdapter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TaskLoader {
  private tasksCache: Map<string, Task> = new Map();
  private tasksDirectory = path.join(__dirname, '../data/tasks');

  async loadAllTasks(): Promise<Task[]> {
    try {
      const files = await fs.readdir(this.tasksDirectory);
      const taskFiles = files.filter((file: string) => file.endsWith('.json'));
      
      const tasks: Task[] = [];
      
      for (const file of taskFiles) {
        const task = await this.loadTask(file);
        if (task) {
          tasks.push(task);
        }
      }
      
      return tasks.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error loading tasks from files, using embedded tasks:', error);
      // Fallback to embedded tasks for production deployment
      return EMBEDDED_TASKS.sort((a, b) => a.id.localeCompare(b.id));
    }
  }

  async loadTask(filename: string): Promise<Task | null> {
    try {
      const taskId = filename.replace('.json', '');
      
      if (this.tasksCache.has(taskId)) {
        return this.tasksCache.get(taskId)!;
      }

      const filePath = path.join(this.tasksDirectory, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const parsedData = JSON.parse(fileContent);
      
      // Check if this is an ARC-AGI format file (with train/test properties)
      if (parsedData.train && parsedData.test) {
        console.log(`Processing ARC-AGI format file: ${filename}`);
        // Convert ARC-AGI format to our task format
        const task = GridFormatAdapter.processArcAgiFormat(parsedData, {
          id: taskId,
          title: `ARC Challenge ${taskId}`,
          description: 'Solve this Abstract Reasoning Challenge pattern.',
          category: '🧩 ARC Challenge',
          emojiSet: 'status_main'
        });
        
        this.tasksCache.set(taskId, task);
        return task;
      }
      
      // Regular task format
      const taskData = parsedData as InsertTask;
      
      // Validate required fields
      if (!taskData.id || !taskData.title || !taskData.emojiSet) {
        console.error(`Invalid task data in ${filename}:`, taskData);
        return null;
      }

      const task: Task = {
        ...taskData,
        timeLimit: taskData.timeLimit || null,
        requiredRankLevel: taskData.requiredRankLevel || 1,
        emojiSet: taskData.emojiSet || 'status_main',
        hints: taskData.hints || []
      };
      
      // Process task to ensure grid data is in the correct format for rendering
      // This handles both integer grids and emoji grids
      const processedTask = GridFormatAdapter.processTaskForRendering(task);

      this.tasksCache.set(taskId, processedTask);
      return processedTask;
    } catch (error) {
      console.error(`Error loading task ${filename}:`, error);
      return null;
    }
  }

  async getTask(taskId: string): Promise<Task | null> {
    return await this.loadTask(`${taskId}.json`);
  }
  
  /**
   * Imports an ARC-AGI format file into the task system
   * @param filePath Path to the ARC-AGI format file
   * @param options Optional task properties
   * @returns The imported task or null if import failed
   */
  async importArcAgiFile(filePath: string, options: Partial<Task> = {}): Promise<Task | null> {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const arcData = JSON.parse(fileContent);
      
      if (!arcData.train || !arcData.test) {
        console.error('Invalid ARC-AGI format:', filePath);
        return null;
      }
      
      // Generate an ID based on the filename if not provided
      const id = options.id || path.basename(filePath, '.json');
      
      // Process ARC-AGI data into our task format
      const task = GridFormatAdapter.processArcAgiFormat(arcData, {
        id,
        ...options
      });
      
      // Cache the task
      this.tasksCache.set(id, task);
      
      // Copy the file to our tasks directory for persistence
      const targetPath = path.join(this.tasksDirectory, `${id}.json`);
      await fs.copyFile(filePath, targetPath);
      
      return task;
    } catch (error) {
      console.error(`Error importing ARC-AGI file ${filePath}:`, error);
      return null;
    }
  }

  clearCache(): void {
    this.tasksCache.clear();
  }
}

export const taskLoader = new TaskLoader();