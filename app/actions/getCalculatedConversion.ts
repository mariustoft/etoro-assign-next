"use server";

export async function getCalculatedConversion(
  init: unknown,
  formData: FormData
) {
  const coin = formData.get("coin")?.toString().toLowerCase();
  const currency = formData.get("currency")?.toString().toLowerCase();
  const amount = Number(formData.get("amount"));

  if (!coin || !currency || !amount) return null;

  const url = new URL(process.env.API_URL + "/simple/price");

  url.searchParams.set("ids", coin.toString());
  url.searchParams.set("vs_currencies", currency.toString());
  url.searchParams.set("amount", amount.toString());

  try {
    const response = await fetch(url.toString());
    if (!response.ok) return null;

    const data = await response.json();

    return {
      total: data[coin][currency] * amount,
      coin: coin,
      currency: currency,
      amount: amount,
    };
  } catch {
    return null;
  }
}
