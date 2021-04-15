import mongoose from 'mongoose'

mongoose.Promise = global.Promise

if (`${process.env.NODE_ENV}` !== 'test') {
  mongoose.connect(`${process.env.MONGODB_URL}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log('Database Connected Error \n', +err))
}

export { mongoose }
