import { IsNotEmpty } from "class-validator";

export class TaskDTO {
    @IsNotEmpty({message: 'Ko được thiếu taskname'})
    taskname?: string;

    @IsNotEmpty({message: 'Deadline ko được thiếu'})
    deadline?: Date;    
}