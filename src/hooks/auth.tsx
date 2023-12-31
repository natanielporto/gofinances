import { ReactNode, createContext, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextData {
  user: User;
  googleSignIn(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function googleSignIn() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();

        const { id, email, given_name, picture } = userInfo;
        setUser({
          id,
          email,
          name: given_name,
          photo: picture,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  const exportedValues = {
    user,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={exportedValues}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
