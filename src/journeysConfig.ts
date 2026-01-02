import type { HaFormSchema, LovelaceConfigForm } from "./types";

export type RGB = [number, number, number];

export type JourneysConfig = {
  title?: string;
  entity: string;
  search_replace?: string[] | string;
  origin_name?: string;
  destination_name?: string;
  index: number;
  color: RGB;
  gradient1: RGB;
  gradient2: RGB;
};

export const DEFAULT_COLOR = [255, 255, 255];
export const DEFAULT_GRADIENT1 = [17, 32, 66];
export const DEFAULT_GRADIENT2 = [104, 49, 172];

export const SCHEMA: HaFormSchema[] = [
  {
    name: "title",
    selector: {
      text: {},
    },
  },
  {
    name: "entity",
    required: true,
    selector: {
      entity: {
        filter: {
          domain: "sensor",
        },
      },
    },
  },
  {
    name: "index",
    selector: {
      number: {
        min: 0,
      },
    },
    required: true,
  },
  {
    name: "origin_name",
    selector: {
      text: {},
    },
  },
  {
    name: "destination_name",
    selector: {
      text: {},
    },
  },
  {
    name: "search_replace",
    selector: {
      text: {
        multiple: true,
      },
    },
  },
  {
    name: "color",
    selector: {
      color_rgb: {},
    },
    default: DEFAULT_COLOR,
  },
  {
    name: "gradient1",
    selector: {
      color_rgb: {},
    },
    default: DEFAULT_GRADIENT1,
  },
  {
    name: "gradient2",
    selector: {
      color_rgb: {},
    },
    default: DEFAULT_GRADIENT2,
  },
];

export function configForm(): LovelaceConfigForm {
  return {
    computeLabel: (schema) => {
      if (schema.name === "title") return "Title";
      if (schema.name === "entity") return "Sensor";
      if (schema.name === "index") return "Index";
      if (schema.name === "search_replace") return "Suppressed Words";

      return undefined;
    },
    computeHelper: (schema) => {
      if (schema.name === "entity") return "hacs-hafas sensor for connection";
      if (schema.name === "index")
        return "Which connection of the sensor do you want to display? 0 being the first";
      if (schema.name === "origin_name")
        return "If origin requires an initial walking leg, this name is displayed as initial origin.";
      if (schema.name === "destination_name")
        return "If destination requires a final walking leg, this name is displayed as total origin.";
      if (schema.name === "search_replace")
        return "Regular Expression to find. Replace is text only. Find may not contain slashes. e.g. 'fi?nd+/replace'";

      return undefined;
    },
    schema: SCHEMA,
  };
}
