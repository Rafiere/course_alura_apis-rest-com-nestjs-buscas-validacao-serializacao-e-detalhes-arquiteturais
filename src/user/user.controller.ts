import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { NestResponse } from "src/core/http/nest-response";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
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
    const foundUser = this.userService.findByNickname(nickname);

    if (!foundUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "User not found!",
      });
    }
    return foundUser;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);

    /* We're creating a response using the "Location" header to satisfy the REST standard. */
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({
        Location: `/users/${createdUser.nickname}`,
      })
      .withBody(createdUser)
      .build();
  }
}
