import { mongoose } from 'src/database'

// interface ITaskArray {
//     {
//         title: String;
//         assignedTo: String;
//     }
// }

export interface IProjectsRepository extends mongoose.Document {
    title: String;
    description: String;
    user: String;
    tasks: Array<{title: String, assignedTo: String}>;
    createdAt: Date;
}
