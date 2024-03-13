import Badge from "./Badge";

export type UserType = {
  userId: string;
  name: string;
  phoneId?: string;
  badges: {
    id: String;
    points: number;
  }[];
  password: string;
};
