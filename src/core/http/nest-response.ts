/* We are implementing a modification inside the NestJS framework. */

export class NestResponse {
  status: number;
  headers: Object;
  body: Object;

  constructor(response: NestResponse) {
    /* All of the parameters of the "response" object will be sent to the "NestResponse".*/

    //this.status = response.status;
    //this.headers = response.headers;
    //this.body = response.body;
    Object.assign(this, response);
  }
}
