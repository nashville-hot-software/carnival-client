import React, {useState} from "react"
import NavBar from './components/navbar/Navbar.js'
import ApplicationViews from './components/ApplicationViews'

const App = () => {

  const isAuthenticated = () => sessionStorage.getItem("Active User Id") !== null;
  
  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = (userId, token) => {
    sessionStorage.setItem("Active User Id", JSON.stringify(userId));
    sessionStorage.setItem("Token", JSON.stringify(token));
    setHasUser(isAuthenticated());
  }

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  }



  //this prop needs to be passed to both app view and the nav bar once they are functional
  // hasUser={hasUser}
  //   clearUser={clearUser}
  //   setUser={setUser}

  return (
    <>
      <NavBar />
      <ApplicationViews />
    </>
  );
};

export default App;
