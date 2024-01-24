"use server";

import { revalidatePath } from "next/cache";

export async function getSimplePrice(init: unknown, formData: FormData) {
  const coin = formData.getAll("coin");
  const currencies = formData.getAll("currencies");

  const url = new URL(process.env.API_URL + "/simple/price");
  url.searchParams.set("ids", coin.join(","));
  url.searchParams.set("vs_currencies", currencies.join(","));
  url.searchParams.set("include_last_updated_at", "true");

  const response = await fetch(url.toString());
  const data = await response.json();

  console.log("getSimplePrice", data);


  if (data["status"]) return null;

  return data as Record<string, Record<string, number>>;
}
