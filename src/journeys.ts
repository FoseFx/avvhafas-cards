import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  HaFAsSensorState,
  HomeAssistant,
  LovelaceConfigForm,
} from "./types";
import "./components/itinerary";
import { minsToFirstLeg, processLegs } from "./utils";
import {
  configForm,
  DEFAULT_COLOR,
  DEFAULT_GRADIENT1,
  DEFAULT_GRADIENT2,
  type JourneysConfig,
} from "./journeysConfig";

/**
 * this is the root component
 */
@customElement("bmn-journeys")
export class Journeys extends LitElement {
  @property()
  hass!: HomeAssistant; // set by home assistant on (every?) state change

  config?: JourneysConfig; // set in setConfig

  get sensorState(): HaFAsSensorState | undefined {
    const entityName = this.config?.entity;
    return entityName
      ? (this.hass.states[entityName] as HaFAsSensorState)
      : undefined;
  }

  get searchReplace(): string[] {
    if (!this.config?.search_replace) return [];
    if (Array.isArray(this.config.search_replace))
      return this.config.search_replace;
    return [this.config.search_replace];
  }

  // lit's render function
  render() {
    if (!this.config) return html`Configuration issues`;
    const active = this.sensorState?.attributes.active ?? false;
    const lastQuery = this.sensorState?.attributes.last_query;
    let connections = this.sensorState?.attributes.connections;
    connections = connections ?? [];
    connections = connections.filter(
      (connection) =>
        connection.legs[0] && minsToFirstLeg(this.now, connection.legs[0]) >= 0
    );
    if (connections.length === 0) return html`No connections`;

    const color = this.config.color ?? DEFAULT_COLOR;
    const gradient1 = this.config.gradient1 ?? DEFAULT_GRADIENT1;
    const gradient2 = this.config.gradient2 ?? DEFAULT_GRADIENT2;

    const style = [
      `--gradient1: rgb(${gradient1.join(", ")})`,
      `--gradient2: rgb(${gradient2.join(", ")})`,
      `--color: rgb(${color.join(", ")})`,
      `--line-color: rgba(${color.join(", ")}, 0.6)`,
    ];

    const legs = processLegs(
      connections[this.config.index].legs,
      this.config.origin_name,
      this.config.destination_name
    );

    return html` <ha-card>
      <bmn-itinerary
        .now="${this.now}"
        .active="${active}"
        .headline="${this.config.title}"
        .searchReplace="${this.searchReplace}"
        .legs="${legs}"
        style="${style.join("; ")}"
      >
      </bmn-itinerary>
      <small style="padding-left: 0.5rem">
      Updated
        ${lastQuery
          ? new Intl.DateTimeFormat("en-DE", {
              dateStyle: "full",
              timeStyle: "long",
              timeZone: "Europe/Berlin",
            }).format(new Date(lastQuery))
          : "unknown"}
        </small>
    </ha-card>`;
  }

  // user supplied configuration
  setConfig(config: JourneysConfig) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }

    this.config = config;
  }

  // home assistant calls this function to display a config form for this card
  static getConfigForm(): LovelaceConfigForm {
    return configForm();
  }

  /*
  In theory, we are not guaranteed updates of the hass object every minute,
  we we keep the current time ourselves with 5 second accuracy (this will trigger a render())
  */
  @state()
  now = Date.now();
  timer?: number = undefined;

  connectedCallback() {
    super.connectedCallback();
    this.timer = setInterval(() => {
      this.now = Date.now();
    }, 5000);
  }

  disconnectedCallback() {
    if (typeof this.timer !== "undefined") clearInterval(this.timer);
    super.disconnectedCallback();
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "bmn-journeys": Journeys;
  }
}
