"use server";

import { revalidatePath } from "next/cache";

const apiUrl = "https://api.coingecko.com/api/v3";

// /simple/price
export async function getSimplePrice(init: unknown, formData: FormData) {
  const coin = formData.getAll("coin");
  const currencies = formData.getAll("currencies");

  const url = new URL(apiUrl + "/simple/price");
  url.searchParams.set("ids", coin.join(","));
  url.searchParams.set("vs_currencies", currencies.join(","));
  url.searchParams.set("include_last_updated_at", "true");

  const response = await fetch(url.toString());
  const data: Record<string, Record<string, number>> = await response.json();

  revalidatePath(url.toString());
  return data;
}

// /simple/supported_vs_currencies
export async function getSupportedCurrencies() {
  const url = new URL(apiUrl + "/simple/supported_vs_currencies");
  const response = await fetch(url.toString());
  const data: string[] = await response.json();
  revalidatePath(url.toString());
  return data ?? [""];
}
