import "./Profile.css";
import { useContext, useState } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!currentUser) {
    return (
      <main className="profile">
        <p className="profile__message">Loading profile...</p>
      </main>
    );
  }

  function handleEditClick() {
    setHeadline(currentUser.headline || "");
    setLocation(currentUser.location || "");
    setSkills(currentUser.skills?.join(", ") || "");
    setProfileError("");
    setIsEditing(true);
  }

  function handleCancelClick() {
    setHeadline(currentUser.headline || "");
    setLocation(currentUser.location || "");
    setSkills(currentUser.skills?.join(", ") || "");
    setProfileError("");
    setIsEditing(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setProfileError("");
    setIsSaving(true);

    const formattedSkills = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    onUpdateProfile({
      headline,
      location,
      skills: formattedSkills,
    })
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        setProfileError(err.message || String(err));
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <section className="profile__card">
          <div className="profile__avatar-wrapper">
            {currentUser.avatar ? (
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
            ) : (
              <div className="profile__avatar-placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="profile__info">
            <p className="profile__eyebrow">YOUR PROFILE</p>

            <h1 className="profile__name">{currentUser.name}</h1>

            {!isEditing ? (
              <>
                <p className="profile__headline">
                  {currentUser.headline || "Add your professional headline"}
                </p>

                <div className="profile__details">
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {currentUser.location || "Not added yet"}
                  </p>
                </div>

                <div className="profile__skills">
                  <h2 className="profile__skills-title">Skills</h2>

                  {currentUser.skills?.length > 0 ? (
                    <div className="profile__skills-list">
                      {currentUser.skills.map((skill) => (
                        <span className="profile__skill" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="profile__empty">No skills added yet.</p>
                  )}
                </div>

                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form className="profile__form" onSubmit={handleSubmit}>
                <label className="profile__label">
                  Professional headline
                  <input
                    className="profile__input"
                    type="text"
                    value={headline}
                    onChange={(evt) => setHeadline(evt.target.value)}
                    placeholder="Example: Frontend Developer"
                  />
                </label>

                <label className="profile__label">
                  Location
                  <input
                    className="profile__input"
                    type="text"
                    value={location}
                    onChange={(evt) => setLocation(evt.target.value)}
                    placeholder="Example: Torreon, Mexico"
                  />
                </label>

                <label className="profile__label">
                  Skills
                  <input
                    className="profile__input"
                    type="text"
                    value={skills}
                    onChange={(evt) => setSkills(evt.target.value)}
                    placeholder="JavaScript, React, Node.js"
                  />
                </label>

                <p className="profile__skills-help">
                  Separate skills with commas.
                </p>

                {profileError && (
                  <p className="profile__error">{profileError}</p>
                )}

                <div className="profile__form-actions">
                  <button
                    className="profile__save-button"
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    className="profile__cancel-button"
                    type="button"
                    onClick={handleCancelClick}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
