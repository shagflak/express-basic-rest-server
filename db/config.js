const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB is online =)");
    } catch (e) {
        console.log(e);
        throw new Error('Error connecting to the db.');
    }
};

module.exports = dbConnection;