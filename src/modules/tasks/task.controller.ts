import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { TaskDTO } from 'src/dto/task.dto';
import { Task } from 'src/models/task.model';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<ResponseData<Task[]>> {
    try {
      return new ResponseData<Task[]>(
        await this.taskService.getTasks(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Task[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createTasks(@Body() dto: TaskDTO): Promise<ResponseData<Task>> {
    try {
      return new ResponseData<Task>(
        await this.taskService.createTasks(dto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Task>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Get('/:id')
  async detailTasks(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<Task>> {
    try {
      return new ResponseData<Task>(
        (await this.taskService.detailTasks(id)) ?? null,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Task>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put('/:id')
  async updateTasks(
    @Body() dto: TaskDTO,
    @Param('id') id: number,
  ): Promise<ResponseData<Task>> {
    try {
      return new ResponseData<Task>(
        await this.taskService.updateTasks(dto, id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Task>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete('/:id')
  async deleteTasks(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        await this.taskService.deleteTasks(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<boolean>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
