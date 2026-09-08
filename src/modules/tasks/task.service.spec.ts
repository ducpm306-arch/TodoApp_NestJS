import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from 'src/models/task.model';

const mockTaskRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepo,
        },
      ],
    }).compile();

    service = moduleRef.get(TaskService);

    jest.clearAllMocks();
  });

  it('getTasks — trả về mảng task', async () => {
    const mockData = [{ id: 1, taskname: 'Test', deadline: new Date() }];
    mockTaskRepo.find.mockResolvedValue(mockData);

    const result = await service.getTasks();

    expect(result).toEqual(mockData);
    expect(mockTaskRepo.find).toHaveBeenCalledTimes(1);
  });

  it('createTasks — tạo và lưu task mới', async () => {
    const dto = { taskname: 'Học NestJS', deadline: new Date() };
    const mockTask = { id: 1, ...dto };
    mockTaskRepo.create.mockReturnValue(mockTask);
    mockTaskRepo.save.mockResolvedValue(mockTask);

    const result = await service.createTasks(dto as any);

    expect(mockTaskRepo.create).toHaveBeenCalledWith(dto);
    expect(mockTaskRepo.save).toHaveBeenCalledWith(mockTask);
    expect(result).toEqual(mockTask);
  });

  it('detailTasks — trả về task theo id', async () => {
    const mockTask = { id: 1, taskname: 'Test', deadline: new Date() };
    mockTaskRepo.findOneBy.mockResolvedValue(mockTask);

    const result = await service.detailTasks(1);

    expect(mockTaskRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockTask);
  });

  it('updateTasks — cập nhật và trả về task mới', async () => {
    const dto = { taskname: 'Updated', deadline: new Date() };
    const mockTask = { id: 1, ...dto };
    mockTaskRepo.update.mockResolvedValue({ affected: 1 });
    mockTaskRepo.findOneBy.mockResolvedValue(mockTask);

    const result = await service.updateTasks(dto as any, 1);

    expect(mockTaskRepo.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(mockTask);
  });

  it('deleteTasks — trả true nếu xóa được', async () => {
    mockTaskRepo.delete.mockResolvedValue({ affected: 1 });
    expect(await service.deleteTasks(1)).toBe(true);
  });

  it('deleteTasks — trả false nếu không tìm thấy', async () => {
    mockTaskRepo.delete.mockResolvedValue({ affected: 0 });
    expect(await service.deleteTasks(999)).toBe(false);
  });
});