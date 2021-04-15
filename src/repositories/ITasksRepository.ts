import { mongoose } from 'src/database'

export interface ITasksRepository extends mongoose.Document {
    title: string;
    project: string;
    assignedTo: string;
    completed: boolean;
    createdAt: Date;
}
