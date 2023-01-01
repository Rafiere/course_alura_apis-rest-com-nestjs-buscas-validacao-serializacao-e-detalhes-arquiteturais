import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { IsUniqueNickname } from "./is-unique-nickname";

export class User {
  id: number;

  /* The "class-validator" package adds a lot of decorators that abstract the logic of various validations. */
  @IsNotEmpty()
  @IsString()
  @IsUniqueNickname({
    message: "The nickname must be unique.",
  })
  nickname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty({ message: "The 'fullname' is a required field." })
  fullName: string;
  registeredAt: Date;
}
