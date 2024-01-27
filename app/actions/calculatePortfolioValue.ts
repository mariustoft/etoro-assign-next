"use server";

import { PORTFOLIO } from "../constants";

export const calculatePortfolioValue = async (
  init?: unknown,
  formData?: FormData
) => {
  const url = new URL(process.env.API_URL + "/simple/price");

  url.searchParams.set("ids", Object.keys(PORTFOLIO).join(","));
  url.searchParams.set("vs_currencies", "usd");
  url.searchParams.set("include_24hr_change", "true");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (response.status !== 200) throw new Error();

    const data = await response.json();

    const total = Object.keys(data).reduce(
      (acc, key) =>
        acc + data[key].usd * (Number(formData?.get(key)) ?? PORTFOLIO[key]),
      0
    );

    return total;
  } catch {
    return null;
  }
};
