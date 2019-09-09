import { injectable } from 'inversify';

@injectable()
export class ExampleService {
    testMe() {
        console.log('Hello world is an Example service');
    }
}
