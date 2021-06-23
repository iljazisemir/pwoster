import React, { useContext } from "react";
import "../styles/pages/Home.css";
import { UidContext } from "../components/AppContext";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import PostContainer from "../components/Post/PostContainer";
import CreatePost from "../components/Post/CreatePost";

const Home = ({ ...props }) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const postData = useSelector((state) => state.postReducer);

  return (
    <>
      {uid ? (
        <>
          <div>
            <div className="top-home-container">
              <h3>Accueil</h3>
            </div>
            <div className="input-post">
              <CreatePost />
            </div>
            <div className="line-separator"></div>
            {!isEmpty(postData) &&
              postData.map((post) => {
                if (post.posterId === userData._id) {
                  let userPostData = "";
                  usersData.map((userPost) => {
                    if (userPost._id === post.posterId) {
                      userPostData = userPost;
                    }
                  });
                  return (
                    <PostContainer
                      post={post}
                      userPost={userPostData}
                      props={props}
                      key={post._id}
                    />
                  );
                } else {
                  for (let userFollowing in userData.following) {
                    if (post.posterId === userData.following[userFollowing]) {
                      let userPostData = "";
                      usersData.map((userPost) => {
                        if (userPost._id === post.posterId) {
                          userPostData = userPost;
                        }
                      });
                      return (
                        <PostContainer
                          post={post}
                          userPost={userPostData}
                          props={props}
                          key={post._id}
                        />
                      );
                    }
                  }
                }
              })}
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Home;
