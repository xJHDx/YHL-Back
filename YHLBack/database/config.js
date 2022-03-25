
const mongoose = require('mongoose');

const dbconexion = async () => {
    try {
        await mongoose.connect( process.env.DB_CON , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Db Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error connection an data base mongodb')
    }
}

module.exports = {
    dbconexion
}