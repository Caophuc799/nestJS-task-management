import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
