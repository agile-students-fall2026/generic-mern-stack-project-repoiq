import { profile as defaultProfile } from "../data/mockData";
import { useEffect, useState } from "react";
import "./Profile.css";
import BackButton from "./BackButton.jsx";

function Profile({ setPage, user, onLogout }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => {
          if (!response.ok) throw new Error("Could not load profile");
          return response.json();
        })
        .then(setProfile)
        .catch(console.error);
    }, []);

  return (
    <div className="phone">
      <header className="add-header">
        <BackButton setPage={setPage} to="home" />
        <h1>My Profile</h1>
      </header>

      <div className="profile">
        <img src={defaultProfile.image} alt="Profile"/>
        <h2>{user?.name}</h2>
        <p>@{profile?.username}</p>
        <p>{user?.email}</p>
        <p>{profile?.bio}</p>
      </div>

      <button type="button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default Profile;
