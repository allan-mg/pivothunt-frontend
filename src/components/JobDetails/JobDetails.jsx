import "./JobDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getJobById } from "../../utils/TheMuseApi";
import Preloader from "../Preloader/Preloader";

function JobDetails() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setApiError("");

    getJobById(jobId)
      .then((data) => {
        setJob(data);
      })
      .catch((err) => {
        console.error(err);
        setApiError(
          "Sorry, we couldn't load this job. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [jobId]);

  if (isLoading) {
    return <Preloader />;
  }

  if (apiError) {
    return <p className="job-details__error">{apiError}</p>;
  }

  if (!job) {
    return null;
  }

  return (
    <main className="job-details">
      <div className="job-details__container">
        <Link className="job-details__back" to="/">
          ← Back to jobs
        </Link>

        <div className="job-details__header">
          <p className="job-details__company">
            {job.company?.name || "Company not available"}
          </p>

          <h1 className="job-details__title">{job.name}</h1>

          <div className="job-details__tags">
            <span className="job-details__tag">
              {job.locations?.[0]?.name || "Location not available"}
            </span>

            <span className="job-details__tag">
              {job.levels?.[0]?.name || "Level not specified"}
            </span>
          </div>
        </div>

        <section
          className="job-details__description"
          dangerouslySetInnerHTML={{ __html: job.contents }}
        />

        <a
          className="job-details__apply-button"
          href={job.refs?.landing_page}
          target="_blank"
          rel="noreferrer"
        >
          Apply on The Muse
        </a>
      </div>
    </main>
  );
}

export default JobDetails;
