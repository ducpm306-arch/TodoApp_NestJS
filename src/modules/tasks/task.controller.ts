import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ResponseData } from "src/global/globalClass";
import { HttpStatus, HttpMessage } from "src/global/globalEnum";
import { TaskDTO } from "src/dto/task.dto";
import { Task } from "src/models/task.model";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    getTasks(): ResponseData<Task[]> {
        try {
            return new ResponseData<Task[]>(this.taskService.getTasks(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Task[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    createTasks(@Body() dto: TaskDTO): ResponseData<Task> {
        try {
            return new ResponseData<Task>(this.taskService.createTasks(dto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Task>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    detailTasks(@Param('id')id: number): ResponseData<Task> {
        try {
            return new ResponseData<Task>(this.taskService.detailTasks(id) ?? null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Task>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/:id')
    updateTasks(@Body() dto: TaskDTO, @Param('id') id: number): ResponseData<Task> {
        try {
            return new ResponseData<Task>(this.taskService.updateTasks(dto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Task>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    deleteTasks(@Param('id') id: number): ResponseData<boolean> {
        try {
            return new ResponseData<boolean>(this.taskService.deleteTasks(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}