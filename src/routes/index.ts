import { HydraExpress } from '../helpers/HydraExpress';
import { AppRequest, AppResponse } from '../interfaces/ExpressApp';

const hydra = HydraExpress.getHydra();
const express = HydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

const serverResponse = new ServerResponse();

serverResponse.enableCORS(true);

express.response.sendError = function(err: Error) {
    serverResponse.sendServerError(this, { result: { error: err } });
};

express.response.sendOk = function(this: Response, result) {
    serverResponse.sendOk(this, { result });
};

const api = express.Router();

api.get('/', async (req: AppRequest, res: AppResponse) => {
    res.sendOk({
        greeting: `Welcome to ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    });
});

module.exports = api;
