import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job, isSaved, onSaveJob, isLoggedIn }) {
  function handleSaveClick() {
    if (!isLoggedIn) {
      return;
    }

    onSaveJob(job);
  }

  const saveButtonLabel = !isLoggedIn
    ? "Sign in to save jobs"
    : isSaved
      ? "Remove saved job"
      : "Save job";

  return (
    <article className="job-card">
      <div className="job-card__header">
        <div>
          <p className="job-card__company">{job.company}</p>

          <h3 className="job-card__title">{job.title}</h3>
        </div>

        <div className="job-card__save-wrapper">
          <button
            className={`job-card__save-button ${
              isSaved ? "job-card__save-button_active" : ""
            } ${!isLoggedIn ? "job-card__save-button_disabled" : ""}`}
            type="button"
            aria-label={saveButtonLabel}
            aria-disabled={!isLoggedIn}
            onClick={handleSaveClick}
          >
            {isSaved ? "♥" : "♡"}
          </button>

          {!isLoggedIn && (
            <span className="job-card__save-tooltip">Sign in to save jobs</span>
          )}
        </div>
      </div>

      <div className="job-card__details">
        <span className="job-card__location">{job.location}</span>

        <span className="job-card__level">{job.level}</span>
      </div>

      <p className="job-card__description">{job.description}</p>

      <Link className="job-card__details-button" to={`/jobs/${job.id}`}>
        View details
      </Link>
    </article>
  );
}

export default JobCard;
