import { mongoose } from 'src/database'

export interface IUsersRepository extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    createdAt: Date;
}
