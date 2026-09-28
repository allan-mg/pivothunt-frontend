const BASE_URL = "https://www.themuse.com/api/public";

const API_KEY = import.meta.env.VITE_THE_MUSE_API_KEY;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Request failed with status ${res.status}`));
}

export function getJobs(page = 0) {
  return fetch(`${BASE_URL}/jobs?page=${page}&api_key=${API_KEY}`).then(
    checkResponse,
  );
}

export function getMultipleJobPages(numberOfPages = 5) {
  const requests = [];

  for (let page = 0; page < numberOfPages; page += 1) {
    requests.push(getJobs(page));
  }

  return Promise.all(requests).then((responses) =>
    responses.flatMap((response) => response.results),
  );
}

export function getJobById(id) {
  return fetch(`${BASE_URL}/jobs/${id}?api_key=${API_KEY}`).then(checkResponse);
}
