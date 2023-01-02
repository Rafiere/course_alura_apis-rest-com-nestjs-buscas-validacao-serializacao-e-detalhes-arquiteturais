import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { IsUniqueNickname } from "./is-unique-nickname";
import { Exclude, Expose } from "class-transformer";

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

  /* The "@Exclude({toPlainOnly: true})" defines that the "password" property will be excluded when Nest returns this entity via JSON. The "@Exclude" is a feature of Class Transformer. */
  @IsNotEmpty()
  @Exclude({
    toPlainOnly: true,
  })
  /* The "@Expose", from "class-decorator", makes, in serialization or desserialization, the name of the property changes to specified "name" attribute. */
  @Expose({
    name: "userPassword",
  })
  password: string;

  @IsNotEmpty({ message: "The 'fullname' is a required field." })
  fullName: string;
  registeredAt: Date;
}
