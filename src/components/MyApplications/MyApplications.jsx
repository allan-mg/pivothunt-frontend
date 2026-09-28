import "./MyApplications.css";
import { useEffect, useState } from "react";

import {
  getApplications,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
} from "../../utils/ApplicationApi";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );
  const [applicationsError, setApplicationsError] = useState("");
  const [editingApplicationId, setEditingApplicationId] = useState(null);
  const [editingNotes, setEditingNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getApplications(token)
      .then((data) => {
        setApplications(data);
      })
      .catch((err) => {
        console.error(err);

        setApplicationsError(err.message || "Could not load applications.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleStatusChange(applicationId, newStatus) {
    const token = localStorage.getItem("jwt");

    updateApplicationStatus(token, applicationId, newStatus)
      .then((updatedApplication) => {
        setApplications((currentApplications) =>
          currentApplications.map((application) =>
            application._id === updatedApplication._id
              ? updatedApplication
              : application,
          ),
        );
      })
      .catch((err) => {
        console.error("Could not update application status:", err);

        setApplicationsError(
          err.message || String(err) || "Could not update application status.",
        );
      });
  }

  function handleEditNotes(application) {
    setEditingApplicationId(application._id);
    setEditingNotes(application.notes || "");
  }

  function handleCancelEditNotes() {
    setEditingApplicationId(null);
    setEditingNotes("");
  }

  function handleSaveNotes(applicationId) {
    const token = localStorage.getItem("jwt");

    updateApplicationNotes(token, applicationId, editingNotes)
      .then((updatedApplication) => {
        setApplications((currentApplications) =>
          currentApplications.map((application) =>
            application._id === updatedApplication._id
              ? updatedApplication
              : application,
          ),
        );

        setEditingApplicationId(null);
        setEditingNotes("");
      })
      .catch((err) => {
        console.error("Could not update application notes:", err);

        setApplicationsError(
          err.message || "Could not update application notes.",
        );
      });
  }

  function handleDeleteApplication(applicationId) {
    const token = localStorage.getItem("jwt");

    deleteApplication(token, applicationId)
      .then(() => {
        setApplications((currentApplications) =>
          currentApplications.filter(
            (application) => application._id !== applicationId,
          ),
        );
      })
      .catch((err) => {
        console.error("Could not delete application:", err);

        setApplicationsError(err.message || "Could not delete application.");
      });
  }

  if (isLoading) {
    return (
      <main className="applications">
        <p className="applications__message">Loading applications...</p>
      </main>
    );
  }

  if (applicationsError) {
    return (
      <main className="applications">
        <p className="applications__error">{applicationsError}</p>
      </main>
    );
  }

  return (
    <main className="applications">
      <div className="applications__container">
        <p className="applications__eyebrow">YOUR JOB SEARCH</p>

        <h1 className="applications__title">My Applications</h1>

        <p className="applications__subtitle">
          Track the opportunities you have applied to with PivotHunt.
        </p>

        {applications.length === 0 ? (
          <p className="applications__empty">
            You have not applied to any jobs yet.
          </p>
        ) : (
          <div className="applications__list">
            {applications.map((application) => (
              <article className="applications__card" key={application._id}>
                <div className="applications__card-header">
                  <div>
                    <p className="applications__company">
                      {application.company}
                    </p>

                    <h2 className="applications__job-title">
                      {application.jobTitle}
                    </h2>
                  </div>

                  <select
                    className="applications__status-select"
                    value={application.status}
                    onChange={(evt) =>
                      handleStatusChange(application._id, evt.target.value)
                    }
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>

                <p className="applications__location">{application.location}</p>

                {editingApplicationId === application._id ? (
                  <div className="applications__notes-editor">
                    <textarea
                      className="applications__notes-textarea"
                      value={editingNotes}
                      onChange={(evt) => setEditingNotes(evt.target.value)}
                      maxLength="1000"
                    />

                    <div className="applications__notes-actions">
                      <button
                        className="applications__save-notes-button"
                        type="button"
                        onClick={() => handleSaveNotes(application._id)}
                      >
                        Save Notes
                      </button>

                      <button
                        className="applications__cancel-notes-button"
                        type="button"
                        onClick={handleCancelEditNotes}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {application.notes && (
                      <p className="applications__notes">{application.notes}</p>
                    )}

                    <button
                      className="applications__edit-notes-button"
                      type="button"
                      onClick={() => handleEditNotes(application)}
                    >
                      Edit Notes
                    </button>
                  </>
                )}

                <p className="applications__date">
                  Applied {new Date(application.appliedAt).toLocaleDateString()}
                </p>

                <button
                  className="applications__delete-button"
                  type="button"
                  onClick={() => handleDeleteApplication(application._id)}
                >
                  Delete Application
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyApplications;
