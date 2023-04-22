import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import PublicRoutes from "./services/routes/PublicRoutes";
import PrivateRoutes from "./services/routes/PrivateRoutes";
import "./App.css";
import TokenContext from "./services/context/TokenContext";

function App() {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") !== null
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => setUser(result))
        .catch((error) => {
          console.error(error);
          setIsLoggedIn();
        });
    }
  }, [isLoggedIn, reload]);

  return (
    <div className="App">
      <TokenContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          reload,
          setReload,
        }}
      >
        <Header />
        {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      </TokenContext.Provider>
    </div>
  );
}

export default App;
