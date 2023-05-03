export class UserJWT {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export interface FindUserByEmail extends Omit<UserJWT, "name" | "password"> {}
