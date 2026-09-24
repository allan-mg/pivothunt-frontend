import "./SavedJobs.css";
import SavedJobsHeader from "../SavedJobsHeader/SavedJobsHeader";

function SavedJobs() {
  return (
    <main className="saved-jobs">
      <SavedJobsHeader />

      <section className="saved-jobs__content">
        <p className="saved-jobs__empty">You haven't saved any jobs yet.</p>
      </section>
    </main>
  );
}

export default SavedJobs;
