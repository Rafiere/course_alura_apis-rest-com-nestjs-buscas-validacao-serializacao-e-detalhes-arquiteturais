import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

/* This will be an exception filter that will be activated whenever an exception occurs. */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /* Using "HttpAdapterHost", regardless of whether we use Fastify or Express, our exception filter will work correctly. */
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    /* We're getting the HTTP context, in this way, we can get the request and the response, for example. */
    const httpContext = host.switchToHttp();

    const requisition = httpContext.getRequest();
    const response = httpContext.getResponse();

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: requisition.path,
              message: exception.message,
            },
          };

    this.httpAdapter.reply(response, body, status);
  }
}
