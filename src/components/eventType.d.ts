export type PrezentlyEvent = {
  date: Date;
  duration: number;
  isPast: boolean;
  name: string;
  photoId: string;
  photo: Photo;
  userId: string;
  user: User;
};

type User = {
  email: string;
  name: string;
  password: string;
};

type Photo = {
  eventId: string;
  imgSrc: string;
  comments: Comment[];
  event: PrezentlyEvent;
};

type Comment = {
  comment: string;
  photoId: srting;
  photo: Photo;
  userId: string;
  user: User;
};
