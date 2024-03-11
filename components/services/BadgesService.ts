import { db } from "../../fireBase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Badge from "../../types/Badge";

export const fetchBage = async (): Promise<Badge[]> => {
  const querySnapshot = await getDocs(collection(db, "badges"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Badge[];
};
