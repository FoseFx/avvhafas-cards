import type { Timedelta, Leg, LegStation, Timestamp } from "./types";

export function arrayEquals<T>(arr1: T[], arr2: T[]): boolean {
  return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
}

export const calcDelay = (td: Timedelta): number => {
  const [hours, minutes] = td.split(":", 3);
  return +hours * 60 + +minutes;
};

export const getStart = (leg: Leg): LegStation => ({
  scheduled: leg.departure,
  delay: calcDelay(leg.delay),
  platform: leg.platform,
  stationName: leg.origin,
});

export const getEnd = (leg: Leg): LegStation => ({
  scheduled: leg.arrival,
  delay: calcDelay(leg.delay_arrival),
  platform: leg.platform_arrival,
  stationName: leg.destination,
});

export function calcTimeStampDeltaMins(a: Timestamp, b: Timestamp): number {
  const aD = new Date(a);
  const bD = new Date(b);

  const msDiff = Math.abs(+aD - +bD);
  return Math.round(msDiff / 1000 / 60);
}

export function minsToFirstLeg(now: number, firstLeg: Leg) {
  const delay = calcDelay(firstLeg.delay);
  const inMs = +new Date(firstLeg.departure) - +now;
  const inMins = Math.round(inMs / 1000 / 60) + delay;
  return inMins;
}

export function processLegs(
  legs: Leg[],
  originName: string | undefined,
  destinationName: string | undefined
): Leg[] {
  let processed = filterPlatformChange(legs);
  processed = walkToPlatform(processed);
  processed = processShortInitialWalk(processed, originName);
  processed = processShortFinalWalk(processed, destinationName);
  return processed;
}

function processShortInitialWalk(
  legs: Leg[],
  originName: string | undefined
): Leg[] {
  const MAX_DURATION_MINS = 3;
  const popFn = (vs: Leg[]) => vs.slice(1);
  return processShortWalk(
    legs,
    legs[0],
    MAX_DURATION_MINS,
    popFn,
    "origin",
    originName
  );
}

function processShortFinalWalk(
  legs: Leg[],
  destinationName: string | undefined
): Leg[] {
  const MAX_DURATION_MINS = 5;
  const popFn = (vs: Leg[]) => vs.slice(0, -1);
  return processShortWalk(
    legs,
    legs[legs.length - 1],
    MAX_DURATION_MINS,
    popFn,
    "destination",
    destinationName
  );
}

function processShortWalk(
  legs: Leg[],
  leg: Leg | undefined,
  maxDuration: number,
  popFn: (ls: Leg[]) => Leg[],
  renameTarget: "origin" | "destination",
  userDefinedName: string | undefined
): Leg[] {
  if (legs.length === 0 || !leg || leg.mode !== "walking") return legs;

  const duration = calcTimeStampDeltaMins(leg.departure, leg.arrival);
  if (duration > maxDuration) {
    // we wont remove this leg, can we replace its name?
    if (userDefinedName) leg[renameTarget] = userDefinedName;
    return legs;
  }

  return popFn(legs);
}

// Platform changes (i.e. at the same station) are not "real" walking legs
function filterPlatformChange(legs: Leg[]): Leg[] {
  return legs.filter(
    (leg) => !(leg.mode === "walking" && leg.destination === leg.origin)
  );
}

// Walking legs have their own origin/destination,
// instead use the previous leg's destination as origin
// and next leg's origin as destination
function walkToPlatform(legs: Leg[]): Leg[] {
  legs.forEach((leg, i) => {
    if (leg.mode !== "walking") return;

    const prev = i > 0 ? legs[i - 1] : undefined;
    const next = i + 1 < legs.length ? legs[i + 1] : undefined;

    if (prev) {
      leg.origin = prev.destination;
      leg.platform = prev.platform_arrival;
    }
    if (next) {
      leg.destination = next.origin;
      leg.platform_arrival = next.platform;
    }
  });
  return legs;
}
