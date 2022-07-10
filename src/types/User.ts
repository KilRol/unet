type User = {
  email: string | null;
  name: string | null;
  image: string;
  userId: string | null;
  id: string;
  about?: string;
  isFriend?: boolean;
  isSub?: boolean;
};

export default User;
