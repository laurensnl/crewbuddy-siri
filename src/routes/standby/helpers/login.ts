import cryptoRandomString from "crypto-random-string";
import fetch, { Response } from "node-fetch";
import { Config } from "../../../config/config";

const { loginUrl, user, password } = Config;

const onSuccess = async (res: Response, phpSessionId: string) => {
  const result = await res.json();

  if (result.success) {
    console.log("Successfully logged in to Crew Buddy");
    return Promise.resolve({ phpSessionId });
  } else {
    throw new Error(`Failed to log in to Crew Buddy: ${result}`);
  }
};

const onError = (err: string) => {
  throw new Error(err);
};

export const login = async () => {
  if (!user)
    throw new Error(
      "Please specify a user in config.ts (see sample-config.ts)"
    );
  if (!password)
    throw new Error(
      "Please specify a password in config.ts (see sample-config.ts)"
    );

  console.log("Logging in to Crew Buddy");

  const phpSessionId = cryptoRandomString({ length: 10 });

  const body = {
    user,
    password,
    phpSessionId,
    remember: true,
  };

  return fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  })
    .then((res) => onSuccess(res, phpSessionId))
    .catch(onError);
};
