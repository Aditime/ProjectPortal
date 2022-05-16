import React, { useState } from "react";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [postCreate, setPostCreate] = useState(false);
  const [postUpdate, setPostUpdate] = useState(null);
  const initialValue = 10;
  const [maxPNO, setMaxPNO] = useState(initialValue);

  function getPosts(){
    const url  = Constants.API_URL_GET_ALL_POSTS;

    fetch(url , {
      method : 'GET'
    })
    .then(response => response.json())
    .then(postsFromServer => {
    // console.log( "postsFromServer:", postsFromServer);
    let localmax=0;
     for (let i =1 ; i <postsFromServer.length ; i ++){
      // console.log(postsFromServer[i].postId)
          if (parseInt(postsFromServer[i].pno) > parseInt(maxPNO) || maxPNO===null)
          {
            localmax=postsFromServer[i].pno
          }   
     }
     
     setMaxPNO(localmax);
     setPosts(postsFromServer);
    // console.log("maxPostId: ", maxPNO, localmax) ;
      

    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  };

  function deletePost(postId) {
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };





  return (
    <div className = "container w-500">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(postCreate === false && postUpdate ===  null)  && (
            <div>
            <h1> Team Project Portal</h1>
                <div className="mt-5">
                  <button onClick={getPosts} className= "btn btn-dark brn-lg w-100"> Get All Projects </button>
                  <button onClick={() =>setPostCreate(true)} className= "btn btn-secondary brn-lg w-100 mt-4"> Create a new Project</button>
                </div>
            </div>
          )}
         
          {(posts.length> 0 && postCreate === false && postUpdate ===  null) && renderPostsTable()}

          {postCreate && <PostCreateForm getMaxPNO = {maxPNO} onPostCreated = {onPostCreated} />}

          {postUpdate!==null  && <PostUpdateForm post={postUpdate} onPostUpdated = {onPostUpdated} />}
        </div>
      </div>
    </div>
  );

function renderPostsTable(){
 // console.log("check posts : ",posts);
  return(
    <div className="table mt-5">
      <table className = "table table-bordered table-hover">
        <thead>
          <tr class="table-active text-center">

            <th scope="col"> Project ID</th>
            <th scope="col"> Title</th>
            <th scope="col"> Content</th>
            <th scope="col"> AssignedTo</th>
            <th scope="col"> DateCreated</th>
            <th scope="col"> DueDate</th>
            <th scope="col"> Project Status</th>
            <th scope="col"> Update/Delete Operations </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            
            <tr className={post.projectStatus === "In Progress" ? 'table-primary' : (post.projectStatus === "Completed"? 'table-success': 'table-default')} key = {post.postId}>
              <th scope="row" width="5%" > {post.pno}</th>
              <td  >{post.title}</td>
              <td>{post.content}</td>
              <td >{post.assignedTo}</td>
              <td >{new Date(post.dateCreated).toLocaleDateString('en-US') + " " + new Date(post.dateCreated).toLocaleTimeString()} </td>
              <td >{new Date(post.dueDate).toLocaleDateString('en-US') + " " + new Date(post.dueDate).toLocaleTimeString()} </td>
              <td >{post.projectStatus}</td>
              <td className="d-flex">
                <button onClick={() => setPostUpdate(post)}  className="btn btn-dark btn-sm mx-2 w-50 h-50">Update</button>
                <button onClick={() => { if(window.confirm(`Are you sure you want to delete this post?`)) deletePost(post.postId) }} className="btn btn-secondary btn-sm w-50 h-50">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPosts([])} className="btn btn-dark btn-lg w-100">Empty Projects List</button>
    </div>
  )
}

function onPostCreated(createdPost){

  setPostCreate(false);
  if (createdPost === null ){
    return;
  }
  alert("Post successfully created.")
  getPosts();
}

function onPostUpdated(updatedPost){
 // console.log("updatedPost: ", updatedPost);
  setPostUpdate(null);

  if (updatedPost === null){
    return;
  }

  let postsCopy = [...posts];

  const index = postsCopy.findIndex((postsCopyPost, currentIndex) =>{
    if (postsCopyPost.postId === updatedPost.postId){
      return true;
    }
  });

  if (index !== -1){
    postsCopy[index] = updatedPost;
  }

  setPosts(postsCopy);
  alert("Post successfully updated"); 
   
}

function onPostDeleted(deletedPostPostId) {
  let postsCopy = [...posts];

  const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
    if (postsCopyPost.postId === deletedPostPostId) {
      return true;
    }
  });

  if (index !== -1) {
    postsCopy.splice(index, 1);
  }

  setPosts(postsCopy);

  alert('Post successfully deleted.');
}

}


