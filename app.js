const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const routeManager = require('./route/route.manager.js')
const db = require("./models/index");
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerDocs = require('./swagger.js')
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const helmet = require('helmet');
const xss = require('xss-clean');
const { connect } = require('pm2')

// set security HTTP headers
const PORT = process.env.PORT || 3001;
app.use(helmet());
app.use(xss());

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

db.sequelize.sync()
    .then(() => {
        console.log("sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
routeManager(app)
swaggerDocs(app, PORT)

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({
        status: false,
        code  : 500,
        error : `Can't find ${err.stack}`
    });
});

// 404 handler
app.use(function (req, res, next) {
    res.status(404).json({
        status: false,
        code  : 404,
        error : `Can't find ${req.originalUrl}`
    });
});


app.listen(PORT, async () => {
    console.log(`:::::::::::::::: SERVER RUNNING ON ${PORT}.`);

    // await connect();
});