import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBase, apiPost, checkToken } from "../utils/reqBackEnd";

const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  //   const apiWithToken = apiBase(token)

  const authenticateUser = (responseToken) => {
    setToken(responseToken);
    localStorage.setItem("authToken", responseToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken();
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const verifyAuth = async () => {
    console.log("verify auth");
    try {
      const tokenFromStorage = localStorage.getItem("authToken");
      if (!tokenFromStorage) {
        console.log("You don't have any token");
      } else {
        const response = await checkToken(tokenFromStorage);
        if (response.errorMessage) {
          throw new Error();
        }
        setToken(tokenFromStorage);
        setIsAuthenticated(true);
        setUserId(response._id);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      //navigate('/notauth')
    }
  };

  const apiWithToken = apiBase(token);

  const apiTokenPost = apiPost(token);

  useEffect(() => {
    verifyAuth();
  }, [token]);
  // deleted apiWithToken from context values for now
  return (
    <SessionContext.Provider
      value={{
        token,
        userId,
        isAuthenticated,
        authenticateUser,
        logout,
        apiWithToken,
        apiTokenPost,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionContextProvider };
