import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

/* In the "AppModule", we must import all application modules. */
@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
