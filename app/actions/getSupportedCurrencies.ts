"use server";

export async function getSupportedCurrencies() {
  const url = new URL(process.env.API_URL + "/simple/supported_vs_currencies");

  try {
    const response = await fetch(url.toString());
    if (!response.ok) return null;

    const data = await response.json();

    return data as string[];
  } catch {
    return null;
  }
}
