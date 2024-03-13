import { db } from "../../fireBase/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { UserType } from "../../types/UserType";

export const fetchUserByID = async (
  userId: string
): Promise<UserType | null> => {
  let user: UserType | null = null;
  const userDocRef = doc(db, "utilisateurs", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    user = userDocSnap.data() as UserType;
  }

  return user;
};
