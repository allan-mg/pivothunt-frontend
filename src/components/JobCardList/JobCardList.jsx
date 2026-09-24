import "./JobCardList.css";
import JobCard from "../JobCard/JobCard";

function JobCardList({ jobs, savedJobs, onSaveJob }) {
  return (
    <section className="job-list">
      <div className="job-list__container">
        <div className="job-list__header">
          <h2 className="job-list__title">Explore opportunities</h2>
          <p className="job-list__count">{jobs.length} jobs found</p>
        </div>

        <div className="job-list__grid">
          {jobs.map((job) => {
            const isSaved = savedJobs.some(
              (savedJob) => savedJob.id === job.id,
            );

            return (
              <JobCard
                key={job.id}
                job={job}
                isSaved={isSaved}
                onSaveJob={onSaveJob}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JobCardList;
