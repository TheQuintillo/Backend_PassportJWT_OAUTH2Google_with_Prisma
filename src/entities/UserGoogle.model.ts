export class UserGoogleModel {
  fullName: string;
  email: string;
  googleId: string;
  picture: string;
  token: string;

  constructor(
    fullName: string,
    email: string,
    googleId: string,
    picture: string,
    token: string
  ) {
    this.fullName = fullName;
    this.email = email;
    this.googleId = googleId;
    this.picture = picture;
    this.token = token;
  }
}

export interface FindUserGoogleModel
  extends Omit<
    UserGoogleModel,
    "fullName" | "googleId" | "picture" | "token"
  > {}

export interface UpdateToken
  extends Omit<UserGoogleModel, "fullName" | "googleId" | "picture"> {}
