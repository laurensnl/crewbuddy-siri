import fetch from "node-fetch";
import { Config } from "../../../config/config";
import { login } from "./login";

const { crewBuddyURL, defaultQuery } = Config;

interface OptionsProps {
  sampleData: boolean;
}

export const fetchFlights = async (options: OptionsProps) => {
  const { sampleData } = options;

  if (sampleData) return sampleData[3];

  const cookies = await login();

  const response = await fetch(crewBuddyURL, {
    method: "POST",
    body: `reqStandbyData=${JSON.stringify(defaultQuery)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie: cookies,
    },
  });

  if (!response.ok) throw new Error("Failed to connect to Crew Buddy");

  try {
    const results = await response.json();
    console.log(results);
    return results[3];
  } catch (err) {
    throw new Error(`Invalid response received from Crew Buddy`);
  }
};
