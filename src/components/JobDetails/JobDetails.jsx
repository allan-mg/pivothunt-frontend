import "./JobDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getJobById } from "../../utils/TheMuseApi";
import { createApplication } from "../../utils/ApplicationApi";
import Preloader from "../Preloader/Preloader";

function JobDetails({ isLoggedIn }) {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [notes, setNotes] = useState("");
  const [applicationError, setApplicationError] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    getJobById(jobId)
      .then((data) => {
        setJob(data);
        setApiError("");
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

  function handleApply(evt) {
    evt.preventDefault();

    setApplicationError("");
    setApplicationSuccess("");

    const token = localStorage.getItem("jwt");

    if (!token) {
      setApplicationError(
        "You need to sign in before applying with PivotHunt.",
      );
      return;
    }

    setIsApplying(true);

    const applicationData = {
      jobId: String(job.id),
      jobTitle: job.name,
      company: job.company?.name || "Company not available",
      location: job.locations?.[0]?.name || "Location not available",
      notes,
    };

    createApplication(token, applicationData)
      .then(() => {
        setApplicationSuccess("Application saved successfully in PivotHunt!");
        setNotes("");
      })
      .catch((err) => {
        console.error(err);
        setApplicationError(err.message || String(err));
      })
      .finally(() => {
        setIsApplying(false);
      });
  }

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
          dangerouslySetInnerHTML={{
            __html: job.contents,
          }}
        />

        <section className="job-details__application">
          <h2 className="job-details__application-title">
            Apply with PivotHunt
          </h2>

          {isLoggedIn ? (
            <form
              className="job-details__application-form"
              onSubmit={handleApply}
            >
              <label className="job-details__application-label">
                Notes
                <textarea
                  className="job-details__application-textarea"
                  value={notes}
                  onChange={(evt) => setNotes(evt.target.value)}
                  placeholder="Add notes about this application..."
                  maxLength="1000"
                />
              </label>

              {applicationError && (
                <p className="job-details__application-error">
                  {applicationError}
                </p>
              )}

              {applicationSuccess && (
                <p className="job-details__application-success">
                  {applicationSuccess}
                </p>
              )}

              <button
                className="job-details__apply-button"
                type="submit"
                disabled={isApplying}
              >
                {isApplying ? "Applying..." : "Apply with PivotHunt"}
              </button>
            </form>
          ) : (
            <p className="job-details__signin-message">
              Sign in to save this application to your PivotHunt account.
            </p>
          )}
        </section>

        <a
          className="job-details__external-button"
          href={job.refs?.landing_page}
          target="_blank"
          rel="noreferrer"
        >
          View original job on The Muse
        </a>
      </div>
    </main>
  );
}

export default JobDetails;
