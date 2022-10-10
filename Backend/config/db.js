const mongoose = require('mongoose')
require('colors')

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    db.on('error', (error) => console.error(`Error:${error.message}`));
    db.once('open', () => console.log(`DetaBase Connected!`.inverse.yellow));
}

module.exports = connectToMongo;