import fetch, { Response } from "node-fetch";
import { Config } from "../../../config/config";
import { parseCookies } from "./parse-cookies";

const { crewBuddyURL, user, password } = Config;

const onSuccess = async (res: Response) => {
  const result = await res.text();
  const cookies = parseCookies(res);

  if (result.includes("loginSuccess")) {
    console.log("Successfully logged in to Crew Buddy");
    return Promise.resolve(cookies);
  } else {
    throw new Error(`Failed to log in to Crew Buddy: ${result}`);
  }
};

const onError = (err: string) => {
  throw new Error(err);
};

export const login = async () => {
  const data = { USER: user, PW: password, REMEMBER: true };

  console.log("Logging in to Crew Buddy");

  return fetch(crewBuddyURL, {
    method: "POST",
    body: `LOGIN=${JSON.stringify(data)}`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  })
    .then(onSuccess)
    .catch(onError);
};
