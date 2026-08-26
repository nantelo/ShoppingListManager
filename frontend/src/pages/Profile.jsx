import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

import { getProfile } from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Sidebar />
        <main className="page-container">
          <Loading text="Loading profile..." />
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <div className="page-heading">
          <div>
            <div className="eyebrow">ACCOUNT</div>
            <h1>Your Profile</h1>
            <p>Manage your account information.</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="profile-details">
            <div>
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <span>Member since</span>
              <strong>
                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </strong>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;