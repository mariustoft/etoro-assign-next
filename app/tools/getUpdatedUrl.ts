"use client";

export function getUpdatedUrl(args: {
  amount?: string;
  coin?: string;
  open?: "1" | "0";
  currencies?: string[];
}) {
  const url = new URL(window.location.href);

  args.amount && url.searchParams.set("amount", args.amount);
  args.coin && url.searchParams.set("coin", args.coin);
  args.open && url.searchParams.set("open", args.open);
  args.currencies &&
    url.searchParams.set("currencies", args.currencies.join(","));

  return url.toString();
}
