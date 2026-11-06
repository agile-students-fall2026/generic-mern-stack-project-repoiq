import { profile } from "../data/mockData";
import "./Profile.css";
import BackButton from "./BackButton.jsx";

function Profile({ setPage }) {
  return (
    <div className="phone">
      <BackButton setPage={setPage} to="home" />
      <h1>My Profile</h1>

      <div className="profile">
        <img src={profile.image} />
        <h2>{profile.name}</h2>
        <p>@{profile.username}</p>
        <p>{profile.email}</p>
        <p>{profile.bio}</p>
      </div>
    </div>
  );
}

export default Profile;
