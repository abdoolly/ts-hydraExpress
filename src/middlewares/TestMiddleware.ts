import { injectable } from 'inversify';
import { AppRequest, AppResponse } from 'hydra-promoted';

@injectable()
// export class TestMiddleware implements Middleware {
export class TestMiddleware {
  // optional property that could be used to rename the middleware
  // if does not exist the class name will be used and it will be treated as controllers
  // in case of nested folders
  name = 'TestMiddlewareExample';

  handle(req: AppRequest, res: AppResponse, next: Function) {
      console.log('Hello world Middleware');
      return next();
  }
}
