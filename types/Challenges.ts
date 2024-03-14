import EventTypes from "./EventTypes";

interface Challenges {
  id: string;
  title: string;
  start: string;
  end: string;
  quantity: number;
  type: EventTypes;
  completed: boolean;
  badgeId: string;
}

export default Challenges;
