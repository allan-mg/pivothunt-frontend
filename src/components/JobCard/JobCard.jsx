import "./JobCard.css";

function JobCard({ job, isSaved, onSaveJob }) {
  return (
    <article className="job-card">
      <div className="job-card__header">
        <div>
          <p className="job-card__company">{job.company}</p>
          <h3 className="job-card__title">{job.title}</h3>
        </div>

        <button
          className={`job-card__save-button ${
            isSaved ? "job-card__save-button_active" : ""
          }`}
          type="button"
          aria-label={isSaved ? "Remove saved job" : "Save job"}
          onClick={() => onSaveJob(job)}
        >
          {isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div className="job-card__details">
        <span className="job-card__location">{job.location}</span>
        <span className="job-card__level">{job.level}</span>
      </div>

      <p className="job-card__description">{job.description}</p>

      <button className="job-card__details-button" type="button">
        View details
      </button>
    </article>
  );
}

export default JobCard;
