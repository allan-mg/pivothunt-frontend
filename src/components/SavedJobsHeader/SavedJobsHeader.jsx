import "./SavedJobsHeader.css";

function SavedJobsHeader() {
  return (
    <section className="saved-jobs-header">
      <div className="saved-jobs-header__container">
        <p className="saved-jobs-header__eyebrow">SAVED OPPORTUNITIES</p>

        <h1 className="saved-jobs-header__title">Your saved jobs</h1>

        <p className="saved-jobs-header__subtitle">
          Keep track of the opportunities you want to explore later.
        </p>
      </div>
    </section>
  );
}

export default SavedJobsHeader;
