export class UserJWT {
  name: string;
  email: string;
  password: string;
  refreshToken: string;

  constructor(
    name: string,
    email: string,
    password: string,
    refreshToken: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.refreshToken = refreshToken;
  }
}

export interface FindUserByEmail
  extends Omit<UserJWT, "name" | "password" | "refreshToken"> {}
