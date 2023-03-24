const mongoose = require('mongoose');


const dbConection = async () => {

    try {

        await mongoose.connect(process.env.MONGODBC,);

        console.log('Base de datos online');

    } catch (error) {
        throw ('Error al levantar a la base de datos', error);
    }

}

module.exports = {
    dbConection
}
