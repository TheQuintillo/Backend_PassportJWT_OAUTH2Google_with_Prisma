import { PrismaClient, User } from "@prisma/client";
import { FindUserByEmail, UserJWT } from "../../entities/UserJWT.model";

export const prisma = new PrismaClient();

export default class UsersGoogle {
  constructor(private readonly prismaUserJWT: PrismaClient["user"]) {}

  async createUser(data: UserJWT): Promise<User> {
    return this.prismaUserJWT.create({ data });
  }

  async findUser(email: string): Promise<User> {
    return this.prismaUserJWT.findUnique({
      where: { email },
    });
  }
  async findUserById(id: number): Promise<User> {
    return this.prismaUserJWT.findUnique({
      where: { id },
    });
  }
}
