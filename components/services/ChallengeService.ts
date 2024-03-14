import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
// import { UserType } from "../../types/UserType";
// import Challenges from "../../types/Challenges";

export const updateUserChallenge = async (
  userId: string,
  Challenges: { id: string; completed: boolean }[]
) => {
  const userDocRef = doc(db, "utilisateurs", userId);
  await updateDoc(userDocRef, { challenges: Challenges });
};

// export const getChallengeUser = async (user: UserType): Promise<any> => {
//   let tabChallenge: Challenges[] = [];

//   if (user?.challenges) {
//     user?.challenges.map((userchallenge) => {});
//   }

//   return tabChallenge;
// };
