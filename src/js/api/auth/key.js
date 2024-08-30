import { API_AUTH_KEY } from "../constants";
import { headers } from "../headers";

export async function getKey(name) {
  const body = JSON.stringify({ name })
  const response = await fetch(API_AUTH_KEY, {
    method: 'post',
    headers: headers(body),
    body
  })

  if (response.ok) {
    return (await response.json()).data
  }

  throw new Error("Auth Error: Could not get an API key")
}