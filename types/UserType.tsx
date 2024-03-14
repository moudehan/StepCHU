export type UserType = {
  userId: string;
  name: string;
  phoneId?: string;
  password: string;
  badges: {
    id: String;
    points: number;
  }[];
  quiz: {
    id: string;
    pointsEarned: boolean;
  }[];
};
