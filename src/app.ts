import 'reflect-metadata';
const version = require('../package.json').version;
const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
const config = require('fwsp-config');
import {
    HydraExpress,
    Hydra,
    ServerResponse,
    ExpressInstance as Express,
    Controllers,
    Middlewares
} from 'hydra-promoted';
import './config/DIManager';

// handling when the application gets a SIGNT to close gracefully
process.on('SIGINT', () => {
    Hydra.shutdown();
    // close db connection here
    // exited gracefully
    process.exit(0);
});

// this is the logger which logs things to the file here
HydraExpress.use(new HydraExpressLogger());

const addingExpressResponseOptions = () => {
    // enabling cors
    ServerResponse.enableCORS(true);

    // adding hydra sendError response objects
    Express.response.sendError = function (err: Error) {
        ServerResponse.sendServerError(this, { result: { error: err } });
    };

    // adding hydra sendOk to response object
    Express.response.sendOk = function (this: Response, result) {
        ServerResponse.sendOk(this, { result });
    };
};

// choosing config based on the NODE_ENV variable
const configPath =
    process.env.NODE_ENV === 'production' ?
        './src/config/prod-config.json' :
        './src/config/dev-config.json';

Controllers.provide('./src/controllers/');
Middlewares.provide('./src/middlewares/');

/**
 * @description Load configuration file and initialize hydraExpress app
 */
config
    .init(configPath)
    .then(() => {
        config.version = version;

        return HydraExpress.init(config.getObject(), version, () => {
            HydraExpress.registerRoutes({
                '/hydra-1': require('./routes/index')
            });
        });
    })
    .then(serviceInfo => console.log('serviceInfo', serviceInfo))
    .then(addingExpressResponseOptions)
    .catch((err: Error) => console.log('err', err));
