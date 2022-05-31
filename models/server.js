const express = require("express");
const cors    = require('cors');
const userRoutes  = require('../routes/user.route');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // all of our route names.
        this.routeNames = {
            usersRoute: '/api/users'
        }

        // Middle-wares
        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.routeNames.usersRoute, userRoutes);
    }

    // call this function on your index to start the server.
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
        // https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
        // more about __dirname -> https://www.geeksforgeeks.org/difference-between-__dirname-and-in-node-js/#:~:text=The%20__dirname%20in%20a,It%20works%20similar%20to%20process.
        this.app.use( express.static('public') )
    }
}

module.exports = Server;
