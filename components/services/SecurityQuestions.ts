import { db } from "../../fireBase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { SecurityQuestion } from "../../types/SecurityQuestionTypes";

export const fetchSecurityQuestions = async (): Promise<SecurityQuestion[]> => {
  const querySnapshot = await getDocs(collection(db, "questionSecuritys"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SecurityQuestion[];
};
