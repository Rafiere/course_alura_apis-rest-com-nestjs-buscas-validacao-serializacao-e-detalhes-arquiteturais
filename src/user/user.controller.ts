import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

/* A controller class should only be responsible for handling the HTTP protocol. */

/* A controller should only know that the service will create a user, that is, it should not know how a user will be created by the service layer. */

/* Underneath the working of the code, if we are using the "create()" method, the "UserController" must be instantiated somewhere. NestJS manages to create an instance of this controller without using the "new" operator. */
@Controller("users")
export class UserController {
  /* When Nest create an instance of "UserController", it should pass a parameter called "userService", of the "UserService" type. */

  /* It works because NestJS has the "IOC Container". */

  // private userService = new UserService();
  constructor(private userService: UserService) {}

  @Get(":nickname")
  public findByNickname(@Param("nickname") nickname: string): User {
    return this.userService.findByNickname(nickname);
  }

  @Post()
  public create(@Body() user: User): User {
    return this.userService.create(user);
  }
}
