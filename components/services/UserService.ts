import { db } from "../../fireBase/FirebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Badge from "../../types/Badge";
import { useAuth } from "../../AuthContext";
import { UserType } from "../../types/UserType";

export const fetchUserByID = async (
  userId: string
): Promise<UserType | null> => {
  //   console.log(userId);
  let user: UserType | null = null;
  const userDocRef = doc(db, "utilisateurs", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    user = userDocSnap.data() as UserType;
  }

  return user;
};
