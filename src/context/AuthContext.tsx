import { useState, useEffect, createContext, useContext } from 'react';
import { account } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { ID, Models } from 'appwrite';

type User = Models.User<Models.Preferences>;

interface AuthContextType {
  user: User | null;
  handleUserLogin: (e: React.FormEvent<HTMLFormElement>, credentials: { email: string; password: string }) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>, credentials: { email: string; password1: string; password2: string; name: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails: User = await account.get();
      setUser(accountDetails);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleUserLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    credentials: { email: string, password: string }
  ) => {
    e.preventDefault();
    // console.log("CREDS:", credentials);

    try {
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      const accountDetails: User = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  }

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    credentials: { email: string, password1: string, password2: string; name: string }
  ) => {
    e.preventDefault();
    // console.log("Handle Register triggered!", credentials);

    if (credentials.password1 !== credentials.password2) {
      alert("Passwords did not match!");
      return;
    }

    try {
      const response: User = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );
      console.log("User registered!", response);

      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password1
      );
      const accountDetails: User = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const contextData: AuthContextType = {
    user,
    handleUserLogin,
    handleLogout,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => {
  // return useContext(AuthContext);
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;