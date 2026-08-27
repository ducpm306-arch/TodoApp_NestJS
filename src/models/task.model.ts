export class Task {
    id?: number;
    taskname?: string;
    deadline?: Date;

    constructor({id, taskname, deadline}: {id?: number; taskname?: string; deadline?: Date}) {
        if (id !== null) this.id = id;
        if (taskname !== null) this.taskname = taskname;
        if (deadline !== null) this.deadline = deadline;
    }
}