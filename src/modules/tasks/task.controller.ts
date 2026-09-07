import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { TaskDTO } from 'src/dto/task.dto';
import { Task } from 'src/models/task.model';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Post()
  createTasks(@Body() dto: TaskDTO) {
    return this.taskService.createTasks(dto);
  }

  @Get('/:id')
  detailTasks(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.detailTasks(id);
  }

  @Put('/:id')
  updateTasks(
    @Body() dto: TaskDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.taskService.updateTasks(dto, id),
  }

  @Delete('/:id')
  @UseGuards(ApiKeyGuard)  
  deleteTasks(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTasks(id),
  }
}
