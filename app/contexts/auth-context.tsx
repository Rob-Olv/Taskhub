import {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";

export interface User {
  id: number;
  username: string;
}

interface AuthContextData {
  user: User | null;

  signIn: (user: User) => void;

  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  function signIn(user: User) {
    setUser(user);
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}