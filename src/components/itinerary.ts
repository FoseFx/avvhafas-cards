import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Itinerary, Leg, LegStation, Timestamp } from "../types";
import {
  arrayEquals,
  calcTimeStampDeltaMins,
  getEnd,
  getStart,
  minsToFirstLeg,
} from "../utils";
import bus from "../assets/bus.svg?raw";
import train from "../assets/train.svg?raw";
import walking from "../assets/walking.svg?raw";
import sleep from "../assets/sleep.svg?raw";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("bmn-itinerary")
export class ItineraryCard extends LitElement {
  @property()
  now!: number;

  @property()
  headline!: string | undefined;

  @property()
  active!: boolean;

  @property()
  legs!: Itinerary;

  @property()
  searchReplace!: string[];

  dateFormat = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  render() {
    return html`
      <div class="card">
        ${this.renderHeadline(this.headline, this.legs[0], this.active)}
        ${this.legs.map((leg, i, legs) => this.renderLeg(leg, i, legs))}
      </div>
    `;
  }

  renderHeadline(
    headline: string | undefined,
    firstLeg: Leg | undefined,
    active: boolean
  ) {
    if (!headline || !firstLeg) return nothing;
    const inMins = minsToFirstLeg(this.now, firstLeg);

    const timeHint = inMins <= 0 ? `jetzt` : `in ${inMins} min`;

    return html`<div class="headline">
      <h1>${active ? nothing : unsafeHTML(sleep)}${this.headline}</h1>
      <span>${timeHint}</span>
    </div>`;
  }

  renderLeg(leg: Leg, i: number, legs: Leg[]) {
    const nextLeg: Leg | undefined = legs[i + 1];
    return html`
      ${i == 0 ? this.renderStations(getStart(leg), null, false) : nothing}
      ${this.renderMode(leg, i)}
      ${this.renderStations(
        getEnd(leg),
        nextLeg ? getStart(nextLeg) : null,
        i === legs.length - 1
      )}
    `;
  }

  renderStations(
    legStation: LegStation,
    nextLegStation: LegStation | null,
    bold: boolean
  ) {
    const legStationHtml = this.renderStation(legStation, bold);

    let nextLegStationHtml = nextLegStation
      ? this.renderStation(nextLegStation, false)
      : nothing;

    const isNextStationNeeded =
      nextLegStationHtml !== nothing &&
      !arrayEquals(legStationHtml.values, nextLegStationHtml.values);

    nextLegStationHtml = isNextStationNeeded ? nextLegStationHtml : nothing;

    return html`
      <div class="${nextLegStation ? "slim" : ""}">
        <div class="symbols">
          <div class="delay">
            ${legStation.delay > 0 ? "+" + legStation.delay : ""}<br />
            ${nextLegStation?.delay! > 0 ? "+" + nextLegStation?.delay : ""}
          </div>
          <div class="bullet">&bull;</div>
        </div>
        <div>${this.renderStation(legStation, bold)} ${nextLegStationHtml}</div>
      </div>
    `;
  }

  formatDate(ts: Timestamp): string {
    return this.dateFormat.format(new Date(ts));
  }

  formatStationName(rawName: string): string {
    let name = rawName;
    for (const instruction of this.searchReplace) {
      const [regex, replace] = instruction.split("/", 2);
      name = name.replaceAll(new RegExp(regex, "gi"), replace ?? "");
    }
    return name.trim();
  }

  renderStation(legStation: LegStation, bold: boolean) {
    return html`
      <span>${this.formatDate(legStation.scheduled)}&nbsp;-</span>
      <span class="${bold ? "bold" : ""}">
        ${this.formatStationName(legStation.stationName)}
      </span>
      <span> ${legStation.platform} </span>
      <br />
    `;
  }

  renderMode(leg: Leg, _i: number) {
    const icon = { bus, train, walking }[leg.mode];

    return html`
      <div>
        <div class="symbols">
          <div class="icon">${unsafeHTML(icon)}</div>
        </div>
        <div>
          <span class="bold">
            ${leg.mode !== "walking"
              ? leg.name
              : `${calcTimeStampDeltaMins(
                  leg.departure,
                  leg.arrival
                )} min Fußweg`}
          </span>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      --gradient1: #112042;
      --gradient2: #6831AC;
      --color: white;
      --delay-color: red;

      --symbol-width: 3rem;
      --symbol-padding: 1rem;
      --font-size: 1.3rem;
      --vertical-space: 1rem;
      --line-padding: 0.9rem;
      --line-color: rgba(255, 255, 255, 0.6);
    }

    .headline {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .headline h1 {
      font-size: var(--ha-font-size-3xl);
      margin: 0;
    }
    .headline svg {
      fill: currentColor;
      height: var(--ha-font-size-3xl);
      padding: 0.5rem;
    }
      
    
    .bold {
      font-weight: bold;
    }

    .card {
      border-radius: var(--ha-card-border-radius,var(--ha-border-radius-lg));
      margin: 0.3rem;
      color: var(--color);
      padding: 1rem;
      background: linear-gradient(180deg, var(--gradient1) 0%, var(--gradient2) 100%);
      display: flex;
      flex-direction: column;
      font-size: var(--font-size);
      gap: var(--vertical-space);
    }

    .card > div, .symbols {
      display: flex;
      flex-direction row;
    }

    .symbols {
      width: var(--symbol-width);
      padding-right: var(--symbol-padding);
      flex-shrink: 0;
      justify-content: end;
    }

    .icon {
      position: relative;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }

    .icon::before, .icon::after {
      content: '';
      display: block;
      position: absolute;
      height: var(--vertical-space);
      border-left: dashed var(--line-color) 3px;
      right: 2px;
    }
    .icon::after {
      top: calc(var(--line-padding) + var(--font-size));
    }
    .icon::before {
      bottom: calc(var(--line-padding) + var(--font-size));
    }

    .icon svg {
      margin-right: -4px;
    }
    .delay {
      color: var(--delay-color);
    }

    .bullet {
      margin-left: var(--symbol-padding);
      display: flex;
      align-items: center;
    }

    .slim {
      line-height: 1.4rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "bmn-itinerary": ItineraryCard;
  }
}
