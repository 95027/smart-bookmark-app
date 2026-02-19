export type AuthContextType = {
  user: User | null;
  logout: () => void;
  loading: boolean;
  session: any
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};
