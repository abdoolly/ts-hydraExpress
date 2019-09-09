import { DIManager } from 'hydra-promoted';
import { ExampleController } from '../controllers/ExampleController';
import { ExampleService } from '../serviceProviders/ExampleService';

DIManager.registerCustomServices(container => {
    // this is used to make custom cases using inversify which has not been included yet
    // in the DIManager
});

DIManager.registerServices([ExampleService, ExampleController]);
