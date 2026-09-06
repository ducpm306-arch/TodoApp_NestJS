import { Injectable } from "@nestjs/common";
import { TaskDTO } from "src/dto/task.dto";
import { Task } from "src/models/task.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskService {

    constructor(
       @InjectableRepository(Task)
       private taskRepo: Repository<Task>, 
    ) {}

    getTasks(): Promise<Task[]> {
        return this.taskRepo.find();
    }

    createTasks(dto: TaskDTO): Promise<Task> {
        const task = this.taskRepo.create(dto);
        return this.taskRepo.save(task);
    }

    detailTasks(id: number): Promise<Task | null> {
        return this.taskRepo.findOneBy({ id });
    }

    async updateTasks(dto: TaskDTO, id: number): Promise<Task | null> {
        await this.taskRepo.update({ id, dto });
        return this.detailTasks(id);
    }

    async deleteTasks(id: number): Promise<boolean> {
        const result = await this.taskRepo.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
