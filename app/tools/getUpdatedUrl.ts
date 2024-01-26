export function getUpdatedUrl(args: {
  [key: string]: string | string[] | undefined;
}) {
  const url = new URL(window.location.href);

  Object.entries(args).forEach(([key, value]) => {
    if (value)
      url.searchParams.set(key, Array.isArray(value) ? value.join(",") : value);
  });

  return url.toString();
}
