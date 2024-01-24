"use server";

import { revalidatePath } from "next/cache";
import { currencies, portfolio } from "../constants";

export type ReturnedDataType = Record<
  keyof typeof portfolio,
  Record<(typeof currencies)[number] | "last_updated_at", number>
>;

export async function getSimplePrice(prevState: any, formData: FormData) {
  const coin = formData.getAll("coin");
  const currencies = formData.getAll("currencies");

  const url = new URL("https://api.coingecko.com/api/v3/simple/price");

  url.searchParams.set("ids", coin.join(","));
  url.searchParams.set("vs_currencies", currencies.join(","));
  url.searchParams.set("include_last_updated_at", "true");

  
  const response = await fetch(url.toString());
  const data: ReturnedDataType = await response.json();
  
  revalidatePath(url.toString());
  return data;
}
