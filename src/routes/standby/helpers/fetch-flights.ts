import fetch from "node-fetch";
import { Config } from "../../../config/config";
import { login } from "./login";

const { dataUrl } = Config;

interface OptionsProps {
  sampleData: boolean;
}

export const fetchFlights = async (options: OptionsProps) => {
  const { sampleData } = options;

  if (sampleData) return sampleData[3];

  const { phpSessionId } = await login();

  const body = {
    phpSessionId,
    lastSyncedAt: null,
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!data.success) throw new Error("Failed to connect to Crew Buddy");

  try {
    return data.data.activities;
  } catch (err) {
    throw new Error(`Invalid response received from Crew Buddy`);
  }
};
