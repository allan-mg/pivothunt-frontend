import { API_BASE_URL as BASE_URL } from "./config";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then((data) => Promise.reject(data.message || `Error: ${res.status}`));
}

export function getSavedJobs(token) {
  return fetch(`${BASE_URL}/saved-jobs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function saveJob(token, job) {
  return fetch(`${BASE_URL}/saved-jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      jobId: String(job.id),
      title: job.title,
      company: job.company,
      location: job.location,
      level: job.level,
      description: job.description,
      url: job.url,
    }),
  }).then(checkResponse);
}

export function deleteSavedJob(token, savedJobId) {
  return fetch(`${BASE_URL}/saved-jobs/${savedJobId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
