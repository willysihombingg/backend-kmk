const mongoose = require('mongoose');

const dbConnectionString = {
    development: process.env.DB_CONNECTION,
    production: process.env.DB_CONNECTION_PRODUCTION
}

mongoose.connect(dbConnectionString[process.env.NODE_ENV || 'development'],
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }
)

    .then(() => {
        console.log(`Database is Connected`)
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })