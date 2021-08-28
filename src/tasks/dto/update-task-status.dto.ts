import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
