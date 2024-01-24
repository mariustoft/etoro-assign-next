"use server";

import { revalidatePath } from "next/cache";

export async function getSupportedCurrencies() {
  const url = new URL(process.env.API_URL + "/simple/supported_vs_currencies");
  const response = await fetch(url.toString(), {
    next: { revalidate: 60 * 60 },
  });
  const data = await response.json();

  console.log("getSupportedCurrencies", data);

  if (data["status"]) return null;

  // revalidatePath(url.toString());
  return data as string[];
}

