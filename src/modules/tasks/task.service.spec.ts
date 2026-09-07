
import { vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';

describe('TaskController', () => {
  let TaskController: TaskController;
  let TaskService: TaskService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TaskController],
        providers: [TaskService],
      }).compile();

    TaskService = moduleRef.get(TaskService);
    TaskController = moduleRef.get(TaskController);
  });

  describe('findAll', () => {
    it('should return an array of Task', async () => {
      const result = ['test'];
      vi.spyOn(TaskService, 'findAll').mockImplementation(() => result);

      expect(await TaskController.findAll()).toBe(result);
    });
  });
});
