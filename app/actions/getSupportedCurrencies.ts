"use server";

import { revalidatePath } from "next/cache";

export async function getSupportedCurrencies() {
  const url = new URL(process.env.API_URL + "/simple/supported_vs_currencies");
  const response = await fetch(url.toString());
  const data: string[] = await response.json();
  // revalidatePath(url.toString());
  return data ?? [""];
}
