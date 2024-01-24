"use server";

import { revalidatePath } from "next/cache";

export async function getSupportedCurrencies() {
  const url = new URL(process.env.API_URL + "/simple/supported_vs_currencies");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 },
    });

    if (response.status !== 200) throw new Error();

    const data = await response.json();
    console.log("getSupportedCurrencies", data);
    revalidatePath("/");

    return data as string[];
  } catch {
    return null;
  }
}
