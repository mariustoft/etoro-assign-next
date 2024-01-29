"use server";

import { PORTFOLIO } from "../constants";

export const calculatePortfolioValue = async (portfolio: typeof PORTFOLIO) => {
  const url = new URL(process.env.API_URL + "/simple/price");

  url.searchParams.set("ids", Object.keys(PORTFOLIO).join(","));
  url.searchParams.set("vs_currencies", "usd");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (response.status !== 200) throw new Error();

    const data = await response.json();

    // add all the values together
    const total = Object.keys(data).reduce((acc, key) => {
      return (
        acc +
        data[key].usd *
          (portfolio[key] ? Number(portfolio[key]) : Number(PORTFOLIO[key]))
      );
    }, 0);

    return total;
  } catch {
    return null;
  }
};
