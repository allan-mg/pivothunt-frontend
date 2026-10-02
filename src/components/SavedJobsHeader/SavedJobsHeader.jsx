import { useContext } from "react";
import "./SavedJobsHeader.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedJobsHeader({ savedJobsCount }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "there";
  const jobsLabel = savedJobsCount === 1 ? "job" : "jobs";

  return (
    <section className="saved-jobs-header">
      <div className="saved-jobs-header__container">
        <p className="saved-jobs-header__eyebrow">SAVED OPPORTUNITIES</p>

        <h1 className="saved-jobs-header__title">
          {userName}, you have {savedJobsCount} saved {jobsLabel}
        </h1>

        <p className="saved-jobs-header__subtitle">
          Keep track of the opportunities you want to explore later.
        </p>

        <div className="saved-jobs-header__summary">
          <span className="saved-jobs-header__count">{savedJobsCount}</span>

          <span className="saved-jobs-header__label">Saved {jobsLabel}</span>
        </div>
      </div>
    </section>
  );
}

export default SavedJobsHeader;
