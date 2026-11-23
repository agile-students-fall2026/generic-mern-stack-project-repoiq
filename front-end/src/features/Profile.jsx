import { profile } from "../data/mockData";
import "./Profile.css";
import BackButton from "./BackButton.jsx";

function Profile({ setPage, onLogout }) {
  return (
    <div className="phone">
      <header className="add-header">
        <BackButton setPage={setPage} to="home" />
        <h1>My Profile</h1>
      </header>

      <div className="profile">
        <img src={profile.image} />
        <h2>{profile.name}</h2>
        <p>@{profile.username}</p>
        <p>{profile.email}</p>
        <p>{profile.bio}</p>
      </div>

      <button type="button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default Profile;
