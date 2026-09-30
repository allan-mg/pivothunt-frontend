import { API_BASE_URL as BASE_URL } from "./config";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then((data) => Promise.reject(data.message || `Error: ${res.status}`));
}

export function createApplication(token, applicationData) {
  return fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(applicationData),
  }).then(checkResponse);
}

export function getApplications(token) {
  return fetch(`${BASE_URL}/applications`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function updateApplicationStatus(token, applicationId, status) {
  return fetch(`${BASE_URL}/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }).then(checkResponse);
}

export function deleteApplication(token, applicationId) {
  return fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function updateApplicationNotes(token, applicationId, notes) {
  return fetch(`${BASE_URL}/applications/${applicationId}/notes`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ notes }),
  }).then(checkResponse);
}
