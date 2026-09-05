import type {Metadata} from "next";

import {siteConfig} from "./site";

export interface MetadataMessages {
  readonly title: string;
  readonly description: string;
  readonly socialImageAlt: string;
}

export function buildMetadata(messages: MetadataMessages): Metadata {
  return {
    metadataBase: new URL(siteConfig.canonicalSiteUrl),
    title: messages.title,
    description: messages.description,
    alternates: {canonical: siteConfig.canonicalSiteUrl},
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: siteConfig.canonicalSiteUrl,
      siteName: siteConfig.productName,
      title: messages.title,
      description: messages.description,
      images: [{url: siteConfig.socialImagePath, width: 1200, height: 630, alt: messages.socialImageAlt}]
    }
  };
}
