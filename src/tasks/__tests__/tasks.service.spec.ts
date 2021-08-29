import { Test } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { TasksRepository } from '../tasks.repository';
import { User } from 'src/auth/user.entity';
import { NotFoundError } from 'rxjs';
import { TaskStatus } from '../task-status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  save: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;
  const mockUser: User = {
    id: 'id',
    username: 'username',
    password: '1111',
    tasks: [],
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    tasksRepository = await module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('should calls TasksRepository.getTasks and return the result', async () => {
      const expectResult = [];
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue(expectResult);
      expect(tasksRepository.getTasks).not.toBeCalled();
      const result = await tasksService.getTasks({}, mockUser);
      expect(tasksRepository.getTasks).toBeCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('getTasks', () => {
    it('should calls TasksRepository.getTasks and return the result', async () => {
      const expectResult = [];
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue(expectResult);
      expect(tasksRepository.getTasks).not.toBeCalled();
      const result = await tasksService.getTasks({}, mockUser);
      expect(tasksRepository.getTasks).toBeCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('getTaskById', () => {
    it('should calls TasksRepository.findOne and return the result', async () => {
      const id = 'id';
      const expectResult = { id, title: 'title', description: 'description' };
      (tasksRepository.findOne as jest.Mock).mockResolvedValue(expectResult);
      expect(tasksRepository.findOne).not.toBeCalled();
      const result = await tasksService.getTaskById(id, mockUser);
      expect(tasksRepository.findOne).toBeCalled();
      expect(result).toEqual(expectResult);
    });

    it('should throw error if task does not exist', async () => {
      const id = 'id';
      (tasksRepository.findOne as jest.Mock).mockResolvedValue(null);

      expect(tasksService.getTaskById(id, mockUser)).rejects.toThrow(
        new NotFoundError('Task with ID id not found'),
      );
      expect(tasksRepository.findOne).toBeCalled();
    });
  });

  describe('createTask', () => {
    it('should calls TasksRepository.createTask and return the result', async () => {
      const expectResult = {
        id: 'id',
        title: 'title',
        description: 'description',
      };
      (tasksRepository.createTask as jest.Mock).mockResolvedValue(expectResult);
      expect(tasksRepository.createTask).not.toBeCalled();
      const result = await tasksService.createTask(
        { title: 'title', description: 'description' },
        mockUser,
      );
      expect(tasksRepository.createTask).toBeCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateTaskStatus', () => {
    it('should calls TasksRepository.save and return the result', async () => {
      const expectResult = {
        id: 'id',
        title: 'title',
        description: 'description',
      };
      (tasksRepository.createTask as jest.Mock).mockResolvedValue(expectResult);
      expect(tasksRepository.createTask).not.toBeCalled();
      const result = await tasksService.createTask(
        { title: 'title', description: 'description' },
        mockUser,
      );
      expect(tasksRepository.createTask).toBeCalled();
      expect(result).toEqual(expectResult);
    });

    it('should throw error if task does not exist', async () => {
      const id = 'id';
      (tasksRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(
        tasksService.updateTaskStatus(id, TaskStatus.DONE, mockUser),
      ).rejects.toThrow(new NotFoundError('Task with ID id not found'));
      expect(tasksRepository.findOne).toBeCalled();
      expect(tasksRepository.save).not.toBeCalled();
    });
  });
});
