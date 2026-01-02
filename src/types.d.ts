import type {
  Auth,
  Connection,
  HassConfig,
  HassEntities,
  HassEntity,
  HassEntityBase,
  HassServices,
  HassServiceTarget,
  MessageBase,
} from "home-assistant-js-websocket";

export type Timestamp = string;
export type Timedelta = `${string}:${string}:${string}`;
export type CSV = string;

export type LegKind = "bus" | "train" | "walking"; // TODO: rename: mode

export interface LegStation {
  scheduled: Timestamp;
  delay: number;
  stationName: string;
  platform: string;
}

export interface Leg {
  origin: string; // name of origin station
  departure: Timestamp; // timestamp of planned departure
  platform: string; // departure platform
  delay: Timedelta; // timedelta of departure delay
  destination: string; // name of destination station
  arrival: Timestamp; // timestamp of planned arrival
  platform_arrival: string; // arrival platform
  delay_arrival: Timedelta; // timedelta of arrival delay
  mode: LegKind; // transport mode such as train
  name: string; // name of transport line such as RE123
}

export type Itinerary = Leg[];

export interface HafasConnection {
  legs: Leg[]; // list of legs with more detailed information
}

export interface Attributes {
  connections: HafasConnection[];
  attribution: string;
  friendly_name: string;
  active: boolean;
  last_query: string;
}

export type HaFAsSensorState = HassEntityBase & {
  attributes: Attributes;
};

/* Ripped from assistant/frontend */
// TODO: are these available as an npm lib?

export type LocalizeFunc<Keys extends string = LocalizeKeys> = (
  key: Keys,
  values?: Record<
    string,
    string | number | HTMLTemplateResult | null | undefined
  >
) => string;

export type HaFormSchema =
  | HaFormConstantSchema
  | HaFormStringSchema
  | HaFormIntegerSchema
  | HaFormFloatSchema
  | HaFormBooleanSchema
  | HaFormSelectSchema
  | HaFormMultiSelectSchema
  | HaFormTimeSchema
  | HaFormSelector
  | HaFormGridSchema
  | HaFormExpandableSchema
  | HaFormOptionalActionsSchema;

export interface HaFormBaseSchema {
  name: string;
  // This value is applied if no data is submitted for this field
  default?: HaFormData;
  required?: boolean;
  disabled?: boolean;
  description?: {
    suffix?: string;
    // This value will be set initially when form is loaded
    suggested_value?: HaFormData;
  };
  context?: Record<string, string>;
}

export interface HaFormGridSchema extends HaFormBaseSchema {
  type: "grid";
  flatten?: boolean;
  column_min_width?: string;
  schema: readonly HaFormSchema[];
}

export interface HaFormExpandableSchema extends HaFormBaseSchema {
  type: "expandable";
  flatten?: boolean;
  title?: string;
  icon?: string;
  iconPath?: string;
  expanded?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  schema: readonly HaFormSchema[];
}

export interface HaFormOptionalActionsSchema extends HaFormBaseSchema {
  type: "optional_actions";
  flatten?: boolean;
  schema: readonly HaFormSchema[];
}

export interface HaFormSelector extends HaFormBaseSchema {
  type?: never;
  selector: Selector;
}

export interface HaFormConstantSchema extends HaFormBaseSchema {
  type: "constant";
  value?: string;
}

export interface HaFormIntegerSchema extends HaFormBaseSchema {
  type: "integer";
  default?: HaFormIntegerData;
  valueMin?: number;
  valueMax?: number;
}

export interface HaFormSelectSchema extends HaFormBaseSchema {
  type: "select";
  options: readonly (readonly [string, string])[];
}

export interface HaFormMultiSelectSchema extends HaFormBaseSchema {
  type: "multi_select";
  options:
    | Record<string, string>
    | readonly string[]
    | readonly (readonly [string, string])[];
}

export interface HaFormFloatSchema extends HaFormBaseSchema {
  type: "float";
}

export interface HaFormStringSchema extends HaFormBaseSchema {
  type: "string";
  format?: string;
  autocomplete?: string;
  autofocus?: boolean;
}

export interface HaFormBooleanSchema extends HaFormBaseSchema {
  type: "boolean";
}

export interface HaFormTimeSchema extends HaFormBaseSchema {
  type: "positive_time_period_dict";
}

export type Selector =
  | ActionSelector
  | AddonSelector
  | AreaSelector
  | AreasDisplaySelector
  | AttributeSelector
  | BooleanSelector
  | ButtonToggleSelector
  | ColorRGBSelector
  | ColorTempSelector
  | ConditionSelector
  | ConversationAgentSelector
  | ConfigEntrySelector
  | ConstantSelector
  | CountrySelector
  | DateSelector
  | DateTimeSelector
  | DeviceSelector
  | FloorSelector
  | LegacyDeviceSelector
  | DurationSelector
  | EntitySelector
  | EntityNameSelector
  | LegacyEntitySelector
  | FileSelector
  | IconSelector
  | LabelSelector
  | LanguageSelector
  | LocationSelector
  | MediaSelector
  | NavigationSelector
  | NumberSelector
  | ObjectSelector
  | AssistPipelineSelector
  | QRCodeSelector
  | SelectSelector
  | SelectorSelector
  | StateSelector
  | StatisticSelector
  | StringSelector
  | STTSelector
  | TargetSelector
  | TemplateSelector
  | ThemeSelector
  | TimeSelector
  | TriggerSelector
  | TTSSelector
  | TTSVoiceSelector
  | UiActionSelector
  | UiColorSelector
  | UiStateContentSelector
  | BackupLocationSelector;

export type Selector =
  | ActionSelector
  | AddonSelector
  | AreaSelector
  | AreasDisplaySelector
  | AttributeSelector
  | BooleanSelector
  | ButtonToggleSelector
  | ColorRGBSelector
  | ColorTempSelector
  | ConditionSelector
  | ConversationAgentSelector
  | ConfigEntrySelector
  | ConstantSelector
  | CountrySelector
  | DateSelector
  | DateTimeSelector
  | DeviceSelector
  | FloorSelector
  | LegacyDeviceSelector
  | DurationSelector
  | EntitySelector
  | EntityNameSelector
  | LegacyEntitySelector
  | FileSelector
  | IconSelector
  | LabelSelector
  | LanguageSelector
  | LocationSelector
  | MediaSelector
  | NavigationSelector
  | NumberSelector
  | ObjectSelector
  | AssistPipelineSelector
  | QRCodeSelector
  | SelectSelector
  | SelectorSelector
  | StateSelector
  | StatisticSelector
  | StringSelector
  | STTSelector
  | TargetSelector
  | TemplateSelector
  | ThemeSelector
  | TimeSelector
  | TriggerSelector
  | TTSSelector
  | TTSVoiceSelector
  | UiActionSelector
  | UiColorSelector
  | UiStateContentSelector
  | BackupLocationSelector;

export interface ActionSelector {
  action: {
    optionsInSidebar?: boolean;
  } | null;
}

export interface AddonSelector {
  addon: {
    name?: string;
    slug?: string;
  } | null;
}

export interface AreaSelector {
  area: {
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    device?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
    multiple?: boolean;
  } | null;
}

export interface AreasDisplaySelector {
  areas_display: {} | null;
}

export interface AttributeSelector {
  attribute: {
    entity_id?: string | string[];
    hide_attributes?: readonly string[];
  } | null;
}

export interface BooleanSelector {
  boolean: {} | null;
}

export interface ButtonToggleSelector {
  button_toggle: {
    options: readonly string[] | readonly SelectOption[];
    translation_key?: string;
    sort?: boolean;
  } | null;
}

export interface ColorRGBSelector {
  color_rgb: {} | null;
}

export interface ColorTempSelector {
  color_temp: {
    unit?: "kelvin" | "mired";
    min?: number;
    max?: number;
    min_mireds?: number;
    max_mireds?: number;
  } | null;
}

export interface ConditionSelector {
  condition: {
    optionsInSidebar?: boolean;
  } | null;
}

export interface ConversationAgentSelector {
  conversation_agent: { language?: string } | null;
}

export interface ConfigEntrySelector {
  config_entry: {
    integration?: string;
  } | null;
}

export interface ConstantSelector {
  constant: {
    value: string | number | boolean;
    label?: string;
    translation_key?: string;
  } | null;
}

export interface CountrySelector {
  country: {
    countries: string[];
    no_sort?: boolean;
  } | null;
}

export interface DateSelector {
  date: {} | null;
}

export interface DateTimeSelector {
  datetime: {} | null;
}

interface DeviceSelectorFilter {
  integration?: string;
  manufacturer?: string;
  model?: string;
  model_id?: string;
}

export interface DeviceSelector {
  device: {
    filter?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    multiple?: boolean;
  } | null;
}

export interface FloorSelector {
  floor: {
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    device?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
    multiple?: boolean;
  } | null;
}

export interface LegacyDeviceSelector {
  device: DeviceSelector["device"] & {
    /**
     * @deprecated Use filter instead
     */
    integration?: DeviceSelectorFilter["integration"];
    /**
     * @deprecated Use filter instead
     */
    manufacturer?: DeviceSelectorFilter["manufacturer"];
    /**
     * @deprecated Use filter instead
     */
    model?: DeviceSelectorFilter["model"];
  };
}

export interface DurationSelector {
  duration: {
    enable_day?: boolean;
    enable_millisecond?: boolean;
  } | null;
}

interface EntitySelectorFilter {
  integration?: string;
  domain?: string | readonly string[];
  device_class?: string | readonly string[];
  supported_features?: number | [number];
}

export interface EntitySelector {
  entity: {
    multiple?: boolean;
    include_entities?: string[];
    exclude_entities?: string[];
    filter?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    reorder?: boolean;
  } | null;
}

export interface LegacyEntitySelector {
  entity: EntitySelector["entity"] & {
    /**
     * @deprecated Use filter instead
     */
    integration?: EntitySelectorFilter["integration"];
    /**
     * @deprecated Use filter instead
     */
    domain?: EntitySelectorFilter["domain"];
    /**
     * @deprecated Use filter instead
     */
    device_class?: EntitySelectorFilter["device_class"];
  };
}

export interface StatisticSelector {
  statistic: {
    device_class?: string;
    multiple?: boolean;
  };
}

export interface FileSelector {
  file: {
    accept: string;
  } | null;
}

export interface IconSelector {
  icon: {
    placeholder?: string;
    fallbackPath?: string;
  } | null;
}

export interface LabelSelector {
  label: {
    multiple?: boolean;
  };
}

export interface LanguageSelector {
  language: {
    languages?: string[];
    native_name?: boolean;
    no_sort?: boolean;
  } | null;
}

export interface LocationSelector {
  location: {
    radius?: boolean;
    radius_readonly?: boolean;
    icon?: string;
  } | null;
}

export interface LocationSelectorValue {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface MediaSelector {
  media: {
    accept?: string[];
    image_upload?: boolean;
    clearable?: boolean;
    hide_content_type?: boolean;
    content_id_helper?: string;
  } | null;
}

export interface MediaSelectorValue {
  entity_id?: string;
  media_content_id?: string;
  media_content_type?: string;
  metadata?: {
    title?: string;
    thumbnail?: string | null;
    media_class?: string;
    children_media_class?: string | null;
    navigateIds?: { media_content_type: string; media_content_id: string }[];
    browse_entity_id?: string;
  };
}

export interface NavigationSelector {
  navigation: {} | null;
}

export interface NumberSelector {
  number: {
    min?: number;
    max?: number;
    step?: number | "any";
    mode?: "box" | "slider";
    unit_of_measurement?: string;
    slider_ticks?: boolean;
    translation_key?: string;
  } | null;
}

interface ObjectSelectorField {
  selector: Selector;
  label?: string;
  description?: string;
  required?: boolean;
}

export interface ObjectSelector {
  object?: {
    label_field?: string;
    description_field?: string;
    translation_key?: string;
    fields?: Record<string, ObjectSelectorField>;
    multiple?: boolean;
  } | null;
}

export interface AssistPipelineSelector {
  assist_pipeline: {
    include_last_used?: boolean;
  } | null;
}

interface SelectBoxOptionImage {
  src: string;
  src_dark?: string;
  flip_rtl?: boolean;
}

export interface SelectOption {
  value: any;
  label: string;
  description?: string;
  image?: string | SelectBoxOptionImage;
  disabled?: boolean;
}

export interface SelectSelector {
  select: {
    multiple?: boolean;
    custom_value?: boolean;
    mode?: "list" | "dropdown" | "box";
    options: readonly string[] | readonly SelectOption[];
    translation_key?: string;
    sort?: boolean;
    reorder?: boolean;
    box_max_columns?: number;
  } | null;
}

export interface SelectorSelector {
  selector: {} | null;
}

export interface StateSelector {
  state: {
    extra_options?: { label: string; value: any }[];
    entity_id?: string | string[];
    attribute?: string;
    hide_states?: string[];
    multiple?: boolean;
  } | null;
}

export interface BackupLocationSelector {
  backup_location: {} | null;
}

export interface QRCodeSelector {
  qr_code: {
    data: string;
    scale?: number;
    error_correction_level?: "low" | "medium" | "quartile" | "high";
    center_image?: string;
  } | null;
}

export interface StringSelector {
  text: {
    multiline?: boolean;
    type?:
      | "number"
      | "text"
      | "search"
      | "tel"
      | "url"
      | "email"
      | "password"
      | "date"
      | "month"
      | "week"
      | "time"
      | "datetime-local"
      | "color";
    prefix?: string;
    suffix?: string;
    autocomplete?: string;
    multiple?: true;
  } | null;
}

export interface STTSelector {
  stt: { language?: string } | null;
}

export interface TargetSelector {
  target: {
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    device?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
  } | null;
}

export interface TemplateSelector {
  template: {} | null;
}

export interface ThemeSelector {
  theme: { include_default?: boolean } | null;
}
export interface TimeSelector {
  time: { no_second?: boolean } | null;
}

export interface TriggerSelector {
  trigger: {} | null;
}

export interface TTSSelector {
  tts: { language?: string } | null;
}

export interface TTSVoiceSelector {
  tts_voice: { engineId?: string; language?: string } | null;
}

export interface UiActionSelector {
  ui_action: {
    actions?: UiAction[];
    default_action?: UiAction;
  } | null;
}

export interface UiColorSelector {
  ui_color: {
    default_color?: string;
    include_none?: boolean;
    include_state?: boolean;
  } | null;
}

export interface UiStateContentSelector {
  ui_state_content: {
    entity_id?: string;
    allow_name?: boolean;
  } | null;
}

export interface EntityNameSelector {
  entity_name: {
    entity_id?: string;
    default_name?: EntityNameItem | EntityNameItem[] | string;
  } | null;
}

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: any;
  /** @deprecated Use `grid_options` instead */
  layout_options?: LovelaceLayoutOptions;
  grid_options?: LovelaceGridOptions;
  type: string;
  [key: string]: any;
  visibility?: Condition[];
  disabled?: boolean;
}

export interface LovelaceConfigForm {
  schema: HaFormSchema[];
  assertConfig?: (config: LovelaceCardConfig) => void;
  computeLabel?: (
    schema: HaFormSchema,
    localize: LocalizeFunc
  ) => string | undefined;
  computeHelper?: (
    schema: HaFormSchema,
    localize: LocalizeFunc
  ) => string | undefined;
}

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string;
  icon?: string;
  device_id?: string;
  area_id?: string;
  labels: string[];
  hidden?: boolean;
  entity_category?: EntityCategory;
  translation_key?: string;
  platform?: string;
  display_precision?: number;
  has_entity_name?: boolean;
}

export interface HomeAssistant {
  auth: Auth & { external?: ExternalMessaging };
  connection: Connection;
  connected: boolean;
  states: HassEntities;
  entities: Record<string, EntityRegistryDisplayEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  areas: Record<string, AreaRegistryEntry>;
  floors: Record<string, FloorRegistryEntry>;
  services: HassServices;
  config: HassConfig;
  themes: Themes;
  selectedTheme: ThemeSettings | null;
  panels: Panels;
  panelUrl: string;
  // i18n
  // current effective language in that order:
  //   - backend saved user selected language
  //   - language in local app storage
  //   - browser language
  //   - english (en)
  language: string;
  // local stored language, keep that name for backward compatibility
  selectedLanguage: string | null;
  locale: FrontendLocaleData;
  resources: Resources;
  localize: LocalizeFunc;
  translationMetadata: TranslationMetadata;
  suspendWhenHidden: boolean;
  enableShortcuts: boolean;
  vibrate: boolean;
  debugConnection: boolean;
  dockedSidebar: "docked" | "always_hidden" | "auto";
  moreInfoEntityId: string | null;
  user?: CurrentUser;
  userData?: CoreFrontendUserData;
  systemData?: CoreFrontendSystemData;
  hassUrl(path?): string;
  callService<T = any>(
    domain: ServiceCallRequest["domain"],
    service: ServiceCallRequest["service"],
    serviceData?: ServiceCallRequest["serviceData"],
    target?: ServiceCallRequest["target"],
    notifyOnError?: boolean,
    returnResponse?: boolean
  ): Promise<ServiceCallResponse<T>>;
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T>;
  callApiRaw( // introduced in 2024.11
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<Response>;
  fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
  sendWS(msg: MessageBase): void;
  callWS<T>(msg: MessageBase): Promise<T>;
  loadBackendTranslation(
    category: Parameters<typeof getHassTranslations>[2],
    integrations?: Parameters<typeof getHassTranslations>[3],
    configFlow?: Parameters<typeof getHassTranslations>[4]
  ): Promise<LocalizeFunc>;
  loadFragmentTranslation(fragment: string): Promise<LocalizeFunc | undefined>;
  formatEntityState(stateObj: HassEntity, state?: string): string;
  formatEntityAttributeValue(
    stateObj: HassEntity,
    attribute: string,
    value?: any
  ): string;
  formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
  formatEntityName(
    stateObj: HassEntity,
    type: EntityNameItem | EntityNameItem[],
    separator?: EntityNameOptions
  ): string;
}
