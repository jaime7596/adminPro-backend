const mongoose = require('mongoose');


//  O9NTaS3kVl2zLsSg


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        });

        console.log('DB Online');
        
    } catch (error) {
        throw new Error('Error a la hora de iniciar la Bd ver logs');
    }

}

module.exports = {
    dbConnection
}

