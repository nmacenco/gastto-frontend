import {NextIntlClientProvider, type AbstractIntlMessages} from "next-intl";
import {render, type RenderOptions} from "@testing-library/react";
import type {ReactElement} from "react";

import messages from "../../messages/es.json";
import {defaultLocale} from "@/i18n/config";

export function renderWithMessages(
  element: ReactElement,
  catalog: AbstractIntlMessages = messages,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(
    <NextIntlClientProvider locale={defaultLocale} messages={catalog}>
      {element}
    </NextIntlClientProvider>,
    options
  );
}
