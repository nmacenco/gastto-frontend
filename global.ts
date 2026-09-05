import messages from "./messages/es.json";
import {supportedLocales} from "./src/i18n/config";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof supportedLocales)[number];
    Messages: typeof messages;
  }
}
