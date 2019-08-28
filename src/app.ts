import { HydraExpress, Hydra } from './interfaces/Hydra';

/**
 * @name TestHydra
 * @summary TestHydra Hydra Express service entry point
 * @description test everything about hydra and says hello
 */

const version = require('../package.json').version;
const hydraExpress: HydraExpress = require('hydra-express');
const hydra: Hydra = hydraExpress.getHydra();

const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;

hydraExpress.use(new HydraExpressLogger());

const config = require('fwsp-config');

process.on('SIGINT', () => {
    hydra.shutdown();
    // close db connection here
    // exited gracefully
    console.log('helloo to the world of iplicat');
    process.exit(0);
});

let configPath = process.env.NODE_ENV === 'production' ? './config/prod-config.json' : './config/dev-config.json';

/**
 * Load configuration file and initialize hydraExpress app
 */
config
    .init(configPath)
    .then(() => {
        config.version = version;

        return hydraExpress.init(config.getObject(), version, () => {
            hydraExpress.registerRoutes({
                '/': require('./routes/index')
            });
        });
    })
    .then(serviceInfo => console.log('serviceInfo', serviceInfo))
    .catch((err: Error) => console.log('err', err));
