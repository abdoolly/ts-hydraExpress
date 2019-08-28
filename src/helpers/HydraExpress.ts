import { HydraExpress as IHydraExpress } from '../interfaces/Hydra';
import curry from 'ramda/src/curry';

type logFunc = (str: string) => any;

/**
 * making this to ease out importing the hydra express and turning it like a typescript import
 */
export const HydraExpress: IHydraExpress = require('hydra-express');

/**
 * @description logger class to ease out the logging capability inside hydra express
 */
export class Logger {
    /**
     * @description using the lambda to curry the log function
     */
    public static info: logFunc = (str: string) => HydraExpress.log('info', str);
    public static debug: logFunc = (str: string) => HydraExpress.log('debug', str);
    public static fatal: logFunc = (str: string) => HydraExpress.log('fatal', str);
    public static error: logFunc = (str: string) => HydraExpress.log('error', str);
}
