import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("api/users/profile/");
        setUser(data);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!user) return <p className="mt-4 text-center">Loading profile...</p>;

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <p><b>Name:</b> {user.first_name || user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}

