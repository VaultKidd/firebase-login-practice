import React from "react";
import "./index.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./assets/Frontend Simplified Logo.png";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [hideButtons, loggedIn] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        loggedIn(true)
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "igor@gmail.com", "Pass123")
      .then((user) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    console.log("login");
    signInWithEmailAndPassword(auth, "igor@gmail.com", "Pass123")
      .then(({ user }) => {
        console.log(user);
        if (user) {
          loggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    console.log("logout");
    signOut(auth);
    setUser({});
    loggedIn(false)
  }

  return (
    <div className="App">
      <nav id="nav">
        <div className="page__details">
          <button className="btn menu">
            <FontAwesomeIcon icon="bars" />
          </button>
          <img className="logo" src={Logo} />
        </div>
        <div className="login__details">
          {hideButtons ? null : (
            <button className="btn login__btn" onClick={login}>
              Login
            </button>
          )}
          {hideButtons ? null : (
            <button className="btn register__btn" onClick={() => register}>
              Register
            </button>
          )}
          {hideButtons ? (
            <button className="btn logout__btn" onClick={logout}>
              {user.email[0].toUpperCase()}
            </button>
          ) : null} 
          {loading ? 'Loading...' : null}
        </div>
      </nav>
    </div>
  );
}

export default App;
