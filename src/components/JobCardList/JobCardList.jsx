import "./JobCardList.css";
import JobCard from "../JobCard/JobCard";

function JobCardList() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Northstar Labs",
      location: "Remote · United States",
      level: "Junior",
      description:
        "Build modern and responsive web experiences using React and JavaScript.",
    },
    {
      id: 2,
      title: "React Developer",
      company: "BrightPath Technologies",
      location: "Remote",
      level: "Mid Level",
      description:
        "Join a product team focused on building intuitive applications for thousands of users.",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Orbit Systems",
      location: "Austin, TX",
      level: "Junior",
      description:
        "Work across React, Node.js, and REST APIs to build scalable web products.",
    },
  ];

  return (
    <section className="job-list">
      <div className="job-list__container">
        <div className="job-list__header">
          <h2 className="job-list__title">Explore opportunities</h2>
          <p className="job-list__count">{jobs.length} jobs found</p>
        </div>

        <div className="job-list__grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobCardList;
