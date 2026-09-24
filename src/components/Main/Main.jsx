import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import JobCardList from "../JobCardList/JobCardList";
import About from "../About/About";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__content">
          <p className="main__eyebrow">YOUR NEXT MOVE STARTS HERE</p>

          <h1 className="main__title">
            Find the opportunity that moves your career forward.
          </h1>

          <p className="main__subtitle">
            Search job opportunities, discover companies, and save the roles
            that match your goals.
          </p>

          <SearchForm />
        </div>
      </section>

      <JobCardList />
      <About />
    </main>
  );
}

export default Main;
