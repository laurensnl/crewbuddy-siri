export type Role = "FOJ" | "FC";
export type Base = "RTM" | "AMS" | "EIN";
export type Day = "today" | "tomorrow";

export interface Flight {
  dep: string;
  dest: string;
  start: Date;
  crew: CrewMember[];
}

export interface Query {
  code: string;
  role: Role;
  base: Base;
  day: Day;
}

export interface CrewMember {
  first_name: string;
  last_name: string;
  code: string;
}
