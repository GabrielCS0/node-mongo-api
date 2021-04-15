import { mongoose } from 'src/database'

export interface IProjectsRepository extends mongoose.Document {
    title: string;
    description: string;
    user: string;
    tasks: Array<{title: String, assignedTo: String}>;
    createdAt: Date;
}
