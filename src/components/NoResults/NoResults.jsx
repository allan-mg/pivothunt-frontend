import "./NoResults.css";

function NoResults() {
  return (
    <section className="no-results">
      <div className="no-results__icon">⌕</div>

      <h2 className="no-results__title">No jobs found</h2>

      <p className="no-results__text">
        Try adjusting your search or using different keywords.
      </p>
    </section>
  );
}

export default NoResults;
