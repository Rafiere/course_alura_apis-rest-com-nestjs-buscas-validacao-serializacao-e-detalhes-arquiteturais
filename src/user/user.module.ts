/* The role of a module in the application is to organize and gather in a central place the resources that have a correlation in same way. */

import { Module } from "@nestjs/common";
import {
  IsUniqueNickname,
  IsUniqueNicknameConstraint,
} from "./is-unique-nickname";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, IsUniqueNicknameConstraint],
})
export class UserModule {}
