"use server";

import { revalidatePath } from "next/cache";

export async function getSimplePrice(init: unknown, formData: FormData) {
  const coin = formData.getAll("coin");
  const currencies = formData.getAll("currencies");

  const url = new URL(process.env.API_URL + "/simple/price");
  url.searchParams.set("ids", coin.join(","));
  url.searchParams.set("vs_currencies", currencies.join(","));
  url.searchParams.set("include_last_updated_at", "true");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (response.status !== 200) throw new Error();

    const data = await response.json();

    console.log("getSimplePrice", data);
    revalidatePath("/");

    return data as Record<string, Record<string, number>>;
  } catch {
    return null;
  }
}
