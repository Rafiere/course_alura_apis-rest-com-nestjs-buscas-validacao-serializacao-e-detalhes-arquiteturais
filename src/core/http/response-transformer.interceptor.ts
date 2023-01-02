import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NestResponse } from "./nest-response";

/* This interceptor will intercept the requisiton when it cames and when it goes. */
@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if (controllerResponse instanceof NestResponse) {
          /* We will create a generic response. */
          const httpContext = context.switchToHttp();
          const response = httpContext.getResponse();
          const { headers, status, body } = controllerResponse;

          /* We're catching all of the attributes from header object. */
          const headersName = Object.getOwnPropertyNames(headers);

          /* For each iteration of foreach, we're getting a header name and inserting into the response. */
          headersName.forEach((headerName) => {
            const headerValue = headers[headerName];

            this.httpAdapter.setHeader(response, headerName, headerValue);
          });

          this.httpAdapter.status(response, status);

          return body;
        }

        /* If the response is not of type "NestResponse", we will let the response pass, as Nest knows how to handle this type of Response. */
        return controllerResponse;
      })
    );
  }
}
