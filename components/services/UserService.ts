import { db } from "../../fireBase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Badge from "../../types/Badge";
import { useAuth } from "../../AuthContext";

export const fetchUser = async (): Promise<any> => {
  const { userId } = useAuth();
  console.log(userId);
  //   const querySnapshot = await getDocs(collection(db, "utilisateurs"));
  //   return querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as Badge[];
  // const usersRef = collection(db, "utilisateurs");
  //     const q = query(usersRef, where("name", "==", userName));

  //   const querySnapshot = await query(
  //     collection(db, "utilisateurs"),
  //     where("id", "==", "badge1")
  //   );

  //   return querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as Badge[];
  return null;
};
