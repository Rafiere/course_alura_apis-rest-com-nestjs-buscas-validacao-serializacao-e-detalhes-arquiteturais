import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

/* With the "@Injectable" decorator, we are indicating to NestJS that the "UserService" class will be injected by the framework, without having to use the "new" operator. */

/* When a class is annotated with an "@Injectable", we are transforming that class into a Provider. Every provider must be declared in an application module. */
@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      nickname: "gb",
      email: "teste@gb.com",
      fullName: "Gabriela Bárbara",
      password: "123456",
      registeredAt: new Date(),
    },
  ];

  public create(user: User): User {
    this.users.push(user);

    return user;
  }

  public findByNickname(nickname: string): User {
    return this.users.find((user) => {
      return user.nickname === nickname;
    });
  }
}
