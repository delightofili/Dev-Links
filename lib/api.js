import { clearToken, getToken, setToken } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchApi(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: "include",
    ...options,
  };

  let response = await fetch(url, config);

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      config.headers.Authorization = `Bearer ${getToken()}`;
      response = await fetch(url, config);
    } else {
      clearToken();
      window.location.href = "/login";
      return;
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Something went wrong");
  }

  return data;
}

async function tryRefreshToken() {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      // include the refresh token cookie automatically
    });

    if (!response.ok) return false;

    const data = await response.json();
    setToken(data.data.accessToken);
    // store the new access token
    return true;
  } catch {
    return false;
  }
}

//GET Request

export function get(endpoint, options = {}) {
  return fetchApi(endpoint, { method: "GET", ...options });
}

export function post(endpoint, body, options = {}) {
  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
}

export function patch(endpoint, body, options = {}) {
  return fetchApi(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
}

export function del(endpoint, options = {}) {
  return fetchApi(endpoint, { method: "DELETE", ...options });
}
