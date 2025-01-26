import { useState, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profilePage.scss";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Ensure the API request is properly working
      const response = await apiRequest.post("/auth/logout");
      console.log("Logout successful:", response);
  
      // Clear the user context
      updateUser(null);
  
      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
      //alert("Failed to logout. Please try again.");
    }
  };

  const openModal = () => {
    setSelectedPhoto(currentUser.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="avatar"
                onClick={openModal}
                className="clickable-avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!</p>}>
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="profile large" className="modal-image" />
            <button className="close-button" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
