import Badge from "./Badge";

export type UserType = {
  userId: string;
  name: string;
  phoneId?: string;
  securityAnswer?: string;
  securityQuestion?: string;
  badges: {
    id: String;
    points: number;
  }[];
};
