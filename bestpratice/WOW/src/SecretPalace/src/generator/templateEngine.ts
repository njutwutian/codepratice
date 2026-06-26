const PLACEHOLDER_PATTERN = /^\{\{([a-zA-Z0-9_]+)\}\}$/;

export const materializeTemplate = (
  templateNode: unknown,
  values: Record<string, unknown>
): unknown => {
  if (Array.isArray(templateNode)) {
    return templateNode.map((node) => materializeTemplate(node, values));
  }

  if (templateNode && typeof templateNode === "object") {
    return Object.keys(templateNode as Record<string, unknown>).reduce(
      (acc, key) => {
        acc[key] = materializeTemplate(
          (templateNode as Record<string, unknown>)[key],
          values
        );
        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  if (typeof templateNode === "string") {
    const match = templateNode.match(PLACEHOLDER_PATTERN);
    if (match) {
      const key = match[1];
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        return values[key];
      }
      return null;
    }
  }

  return templateNode;
};
