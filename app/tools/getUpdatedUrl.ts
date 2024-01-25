export function getUpdatedUrl(args: {
  amount?: string;
  coin?: string;
  open?: "1" | "0";
  currencies?: string[];
}) {
  const url = new URL(window.location.href);

  Object.entries(args).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, Array.isArray(value) ? value.join(",") : value);
  });

  return url.toString();
}
