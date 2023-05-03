export class UserGoogleModel {
  fullName: string;
  email: string;
  googleId: string;
  picture: string;

  constructor(
    fullName: string,
    email: string,
    googleId: string,
    picture: string
  ) {
    this.fullName = fullName;
    this.email = email;
    this.googleId = googleId;
    this.picture = picture;
  }
}

export interface FindUserGoogleModel
  extends Omit<UserGoogleModel, "fullName" | "googleId" | "picture"> {}
