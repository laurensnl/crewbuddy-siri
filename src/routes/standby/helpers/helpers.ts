import moment from "moment";

interface isValid {
  valid?: boolean,
  error?: string
}

export function isValidQuery(query): isValid {
  const { code, role, base, day } = query;

  if (!code) return { error: 'Missing crew code (add code: "XXX" to query)'};
  if (!role) return { error: 'Missing role (add role: "FOJ" | "FC" to query)'};
  if (!base) return { error: 'Missing base (add base: "RTM" | "AMS" | "EIN" to query)'};
  if (!day) return { error: 'Missing day (add day: "today" | "tomorrow" to query)'};

  return { valid: true };
}

export function pluralizeNumberOfFlights(numberOfOpenFlights: number) {
  switch (numberOfOpenFlights) {
    case 0:
      return `There are no open flights`;
    case 1:
      return `There is 1 open flight`;
    default:
      return `There are ${numberOfOpenFlights} open flights`;
  }
}

export function formatFlight(flight, role) {
  const { arr, std } = flight;
  const otherCrewMember = getOtherCrewMember(flight, role);
  const otherRole = getRoleName(getOtherRole(role));

  return `${getDestinationName(arr)}, departing at ${formatTime(
    std
  )} local with ${
    otherCrewMember ? otherCrewMember : `an unknown ${otherRole}`
  }.`;
}

export function getOtherRole(role) {
  const otherRole = {
    FOJ: "FC",
    FC: "FOJ"
  };
  return otherRole[role];
}

export function getOtherCrewMember(flight, role) {
  const otherRole = getOtherRole(role);
  return getCrewMember(flight, otherRole);
}

export function getRoleName(role) {
  const roleNames = {
    FOJ: "First Officer",
    FC: "captain"
  };
  return roleNames[role];
}

export function getCrewMember(flight, role) {
  for (const crewmember of flight.crew) {
    const { type, code } = crewmember;
    if (type === role) {
      return formatName(crewmember);
    }
  }
}

export function formatName(crewmember) {
  const { firstname, lastname, code } = crewmember;
  if (!code) {
    return;
  }
  const regex = /\(.+\)/g;
  return `${firstname.replace(regex, "")} ${lastname}`;
  // TODO: remove space
}

export function formatTime(date) {
  return moment
    .utc(date)
    .local()
    .format("HH:mm");
}

export function getDestinationName(destination) {
  const destinations = {
    AMS: "Amsterdam",
    RTM: "Rotterdam",
    EIN: "Eindhoven",
    DBV: "Dubrovnik",
    BCN: "Barcelona",
    BUD: "Budapest",
    FAO: "Faro",
    HER: "Heraklion",
    AGP: "Malaga",
    IBZ: "Ibiza",
    EGC: "Bergerac",
    ALC: "Alicante",
    VLC: "Valencia",
    VIE: "Wien",
    SPU: "Split",
    LEI: "Almería",
    TFS: "Tenerife",
    GRO: "Girona",
    PSA: "Pisa",
    VCE: "Venice",
    LPA: "Las Palmas",
    LIS: "Lisbon",
    PMI: "Palma de Mallorca",
    INN: "Innsbruck",
    SZG: "Salzburg",
    AHU: "Al Hoceima",
    GVA: "Geneva",
    TNG: "Tangier",
    NDR: "Nador"
  };

  return destinations[destination] || destination;
}
