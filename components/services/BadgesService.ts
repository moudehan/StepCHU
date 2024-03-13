import { db } from "../../fireBase/FirebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Badge from "../../types/Badge";
import { UserType } from "../../types/UserType";

export const getAllBadge = async (): Promise<Badge[]> => {
  const querySnapshot = await getDocs(collection(db, "badges"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Badge[];
};

export const getBadgeUser = async (user: UserType): Promise<any> => {
  const fetchBadges = await getAllBadge();
  let tabBadge: Badge[] = [];
  fetchBadges.map((badge) => {
    if (user?.badges) {
      let badgeFound = false;
      user?.badges.map((userBadge) => {
        if (badge.id == userBadge.id) {
          badgeFound = true;
          tabBadge.push({ ...badge, points: userBadge.points });
        }
      });
      if (!badgeFound) {
        tabBadge.push({ ...badge, points: 0 });
      }
    } else {
      tabBadge.push({ ...badge, points: 0 });
    }
  });
  return tabBadge;
};

export const updateUserBadges = async (
  userId: string,
  badges: { id: string; points: number }[]
) => {
  const userDocRef = doc(db, "utilisateurs", userId);
  await updateDoc(userDocRef, { badges: badges });
};
