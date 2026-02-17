export type AuthContextType = {
  user: User | null;
  logout: () => void;
  loading: boolean;
};

export type User = {
  email: string;
  name: string;
  avatar?: string;
};
