import { mongoose } from 'src/database'

export interface ITasksRepository extends mongoose.Document {
    title: String;
    project: String;
    assignedTo: String;
    completed: Boolean;
    createdAt: Date;
}
