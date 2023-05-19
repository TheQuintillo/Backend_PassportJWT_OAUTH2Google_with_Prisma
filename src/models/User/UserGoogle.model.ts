import { PrismaClient, User, UserGoogle } from "@prisma/client";
import {
  UserGoogleModel,
  FindUserGoogleModel,
  UpdateToken,
} from "@entities/UserGoogle.model";

export const prisma = new PrismaClient();

export default class UsersGoogle {
  constructor(private readonly prismaUserGoogle: PrismaClient["userGoogle"]) {}

  async createUser(data: UserGoogleModel): Promise<UserGoogle> {
    return this.prismaUserGoogle.create({ data });
  }

  async findUser(query: FindUserGoogleModel): Promise<UserGoogle> {
    return this.prismaUserGoogle.findUnique({ where: { email: query.email } });
  }

  async authentication(payload: any): Promise<UserGoogle> {
    return this.prismaUserGoogle.findUnique({
      where: { email: payload.email },
    });
  }
  async updateToken(email: any, token: any): Promise<UserGoogle> {
    return this.prismaUserGoogle.update({
      where: {
        email: email,
      },
      data: { token: token },
    });
  }
}
