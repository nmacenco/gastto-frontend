import {parse} from "@formatjs/icu-messageformat-parser";

function flattenCatalog(value, path = "", result = new Map()) {
  if (typeof value === "string") {
    result.set(path, value);
    return result;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Catalog value at ${path || "<root>"} must be an object or message string.`);
  }
  for (const [key, child] of Object.entries(value)) {
    flattenCatalog(child, path ? `${path}.${key}` : key, result);
  }
  return result;
}

function collectArguments(nodes, result = new Set()) {
  for (const node of nodes) {
    if (node && typeof node === "object") {
      if ([1, 2, 3, 4, 5, 6].includes(node.type) && typeof node.value === "string") result.add(node.value);
      if (node.options) {
        for (const option of Object.values(node.options)) collectArguments(option.value, result);
      }
      if (Array.isArray(node.children)) collectArguments(node.children, result);
    }
  }
  return [...result].sort();
}

function argumentsFor(message, locale, key) {
  try {
    return collectArguments(parse(message));
  } catch {
    throw new Error(`Malformed ICU message in locale ${locale} at ${key}.`);
  }
}

export function validateCatalogs(catalogs, sourceLocale = "es") {
  if (!catalogs[sourceLocale]) throw new Error(`Source catalog ${sourceLocale} is missing.`);
  const source = flattenCatalog(catalogs[sourceLocale]);
  const sourceKeys = [...source.keys()].sort();
  const sourceArguments = new Map(sourceKeys.map((key) => [key, argumentsFor(source.get(key), sourceLocale, key)]));

  for (const [locale, catalog] of Object.entries(catalogs)) {
    const candidate = flattenCatalog(catalog);
    const candidateKeys = [...candidate.keys()].sort();
    if (JSON.stringify(candidateKeys) !== JSON.stringify(sourceKeys)) {
      throw new Error(`Catalog keys for ${locale} do not match ${sourceLocale}.`);
    }
    for (const key of sourceKeys) {
      const candidateArguments = argumentsFor(candidate.get(key), locale, key);
      if (JSON.stringify(candidateArguments) !== JSON.stringify(sourceArguments.get(key))) {
        throw new Error(`ICU arguments for ${locale} at ${key} do not match ${sourceLocale}.`);
      }
    }
  }
}
