const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/configdb');

const app = express()


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;


        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //coneccion con DB
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        
        // Parseo y lectura del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.authPath, require ('../routes/auth'));

        this.app.use(this.usuariosPath, require ('../routes/user-routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;