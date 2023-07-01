import { ReactNode, createContext, useContext } from "react";
import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  googleSignIn(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1244124",
    name: "rawerwarqerqwerq",
    email: "rqertgasgsdfgsdfgedfgwergweragerhbertbne",
  };

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

async function googleSignIn() {
  try {
    const CLIENT_ID = `179549715874-00td948h7m6o8forqlctnsgoiraiag56.apps.googleusercontent.com `;
    const REDIRECT_URI = "https://auth.expo.io/@natanielcodes/gofinances";
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const response = await AuthSession.startAsync({ authUrl });

    console.log(response);
  } catch (err) {
    throw new Error(err);
  }
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
