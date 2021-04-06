import { mongoose } from 'src/database'

export interface IUsersRepository extends mongoose.Document {
    name: String;
    email: String;
    password: String;
    passwordResetToken: String;
    passwordResetExpires: Date;
    createdAt: Date;
}
