const express = require("express");
const cors    = require('cors');
const userRoutes  = require('../routes/user.route');
const dbConnection = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // all of our route names.
        this.routeNames = {
            usersRoute: '/api/users'
        }

        this.connectDB();

        // Middle-wares
        this.middlewares();

        this.routes();
    }

    routes() {
        // we use api/users as a base route then userRoutes routes should not re-include this base path.
        this.app.use(this.routeNames.usersRoute, userRoutes);
    }

    // call this function on your index to start the server.
    // Ex, const server = new Server();
    // server.listen();
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running in port:', this.port);
        });
        
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // parse and read json data
        this.app.use( express.json() );


        // public directory
        // NOTE: I had to use __dirname to make this middleware work 
        // UPDATE ON LAST NOTE: The reason why i had to use __dirname was because the public folder was on other folder
        // no on the same folder as this script now it works fine with just public.
        //
        // https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
        // more about __dirname -> https://www.geeksforgeeks.org/difference-between-__dirname-and-in-node-js/#:~:text=The%20__dirname%20in%20a,It%20works%20similar%20to%20process.
        this.app.use( express.static('public') )
    }

    async connectDB() {
        await dbConnection();
    }
}

module.exports = Server;
