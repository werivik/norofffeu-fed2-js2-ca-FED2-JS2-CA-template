export const API_KEY = "61e9b0bf-80f9-451e-8787-b876c0610df8";

export const API_NAMESPACE = "demo";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`

export const API_SOCIAL_PROFILE_POSTS = (name) => `${API_SOCIAL_PROFILES}/${name}/posts`;