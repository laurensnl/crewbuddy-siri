import fetch from "node-fetch";
import { Config } from "../../../config/config";

const { crewBuddyURL, defaultQuery } = Config;

interface OptionsProps {
  sampleData: boolean;
}

export async function fetchFlights(options: OptionsProps) {
  const { sampleData } = options;

  if (sampleData) return sampleData[3];

  const query = defaultQuery;

  const response = await fetch(crewBuddyURL, {
    method: "POST",
    body: `reqStandbyData=${JSON.stringify(query)}`,
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });

  if (!response.ok) throw new Error("Failed to get flights from Crew Buddy");

  const results = await response.json();

  return results[3];
}
