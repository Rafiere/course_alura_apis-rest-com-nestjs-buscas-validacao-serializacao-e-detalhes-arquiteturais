import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

/* A controller class should only be responsible for handling the HTTP protocol. */

/* A controller should only know that the service will create a user, that is, it should not know how a user will be created by the service layer. */
@Controller("users")
export class UserController {
  private userService = new UserService();

  @Post()
  public create(@Body() user) {
    return this.userService.create(user);
  }
}
