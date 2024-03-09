import { db } from "../../fireBase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NewsletterType } from "../../types/NewsletterTypes";

export const fetchNewsletters = async (): Promise<NewsletterType[]> => {
  const querySnapshot = await getDocs(collection(db, "newsletters"));
  const newsletters = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as NewsletterType[];
  return newsletters;
};
