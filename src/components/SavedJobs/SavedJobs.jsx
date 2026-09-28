import "./SavedJobs.css";
import SavedJobsHeader from "../SavedJobsHeader/SavedJobsHeader";
import JobCard from "../JobCard/JobCard";

function SavedJobs({ savedJobs, onSaveJob }) {
  return (
    <main className="saved-jobs">
      <SavedJobsHeader />

      <section className="saved-jobs__content">
        {savedJobs.length === 0 ? (
          <p className="saved-jobs__empty">You haven't saved any jobs yet.</p>
        ) : (
          <div className="saved-jobs__grid">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={true}
                onSaveJob={onSaveJob}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SavedJobs;
