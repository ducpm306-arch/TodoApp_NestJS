import { Injectable } from "@nestjs/common";
import { TaskDTO } from "src/dto/task.dto";
import { Task } from "src/models/task.model";

@Injectable()
export class TaskService {

    private task: Task[] = [];

    getTasks(): Task[] {
        return this.task;
    }

    createTasks(dto: TaskDTO): Task {
        const task: Task = { id: Math.random(), ...dto };
        this.task.push(task);
        return task;
    }

    detailTasks(id: number) {
        return this.task.find((p) => p.id === Number(id));
    }

    updateTasks(dto: TaskDTO, id: number) {
        const index = this.task.findIndex((p) => p.id === Number(id));
        this.task[index] = { ...this.task[index], ...dto };
        return this.task[index];
    }

    deleteTasks(id: number): boolean {
        const index = this.task.findIndex((p) => p.id === Number(id));
        if (index === -1) return false;
        this.task.splice(index, 1);
        return true;
    }
}