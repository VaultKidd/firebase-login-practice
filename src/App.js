import React from "react";
import "./index.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore"
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

  async function updatePost() {
    const hardcodedId = "4HmCJYpFsyhySsujr0PA"
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a £400k job",
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "4HmCJYpFsyhySsujr0PA"
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview section",
      description: "This is how I plan to finish this section",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts)
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        loggedIn(true);
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
    loggedIn(false);
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
          {loading ? "Loading..." : null}
          <button className="btn register__btn" onClick={createPost}>Create Post</button>
          <button className="btn register__btn" onClick={getAllPosts}>Get All Posts</button>
          <button className="btn register__btn" onClick={getPostById}>Get Post By Id</button>
          <button className="btn register__btn" onClick={getPostByUid}>Get Post By Uid</button>
          <button className="btn register__btn" onClick={updatePost}>Update Post</button>
          <button className="btn register__btn" onClick={deletePost}>Delete Post</button>
        </div>
      </nav>
    </div>
  );
}

export default App;
