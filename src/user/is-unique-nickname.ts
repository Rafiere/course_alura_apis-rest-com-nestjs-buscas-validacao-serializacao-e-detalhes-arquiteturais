import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from "class-validator";
import { UserService } from "./user.service";

/* When we use "Injectable()", we are allowing dependency injection to be done in this validation interface. */
@ValidatorConstraint()
@Injectable()
export class IsUniqueNicknameConstraint
  implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  validate(
    username: string,
    validationArguments?: ValidationArguments
  ): boolean | Promise<boolean> {
    const user = this.userService.findByNickname(username);
    console.log(user);

    if (user) {
      return false;
    }
    return true;
  }
}

/* The "IsUniqueNickname" is the name of the decorator. */
export function IsUniqueNickname(validationOptions: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    /* The "registerDecorator()" function will receive some configurations. */
    registerDecorator({
      /* The "target" is a function that will tell the validator class how to build the validation target object. */
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      /* This code will define the code that will be executed by our validation. */
      validator: IsUniqueNicknameConstraint,
    });
  };
}
