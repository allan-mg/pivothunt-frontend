import "./JobCardList.css";
import { useState } from "react";

import JobCard from "../JobCard/JobCard";
import NoResults from "../NoResults/NoResults";
import Preloader from "../Preloader/Preloader";

function JobCardList({
  jobs,
  savedJobs,
  onSaveJob,
  isLoading,
  apiError,
  isLoggedIn,
}) {
  const [visibleJobs, setVisibleJobs] = useState(3);

  function handleShowMore() {
    setVisibleJobs((current) => current + 3);
  }

  const jobsToShow = jobs.slice(0, visibleJobs);

  return (
    <section className="job-list">
      <div className="job-list__container">
        <div className="job-list__header">
          <h2 className="job-list__title">Explore opportunities</h2>

          <p className="job-list__count">{jobs.length} jobs found</p>
        </div>

        {isLoading ? (
          <Preloader />
        ) : apiError ? (
          <p className="job-list__error">{apiError}</p>
        ) : jobs.length === 0 ? (
          <NoResults />
        ) : (
          <>
            <div className="job-list__grid">
              {jobsToShow.map((job) => {
                const isSaved = savedJobs.some(
                  (savedJob) => String(savedJob.id) === String(job.id),
                );

                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={isSaved}
                    onSaveJob={onSaveJob}
                    isLoggedIn={isLoggedIn}
                  />
                );
              })}
            </div>

            {visibleJobs < jobs.length && (
              <button
                className="job-list__show-more"
                type="button"
                onClick={handleShowMore}
              >
                Show more
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default JobCardList;
