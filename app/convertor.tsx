"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getSimplePrice } from "./actions/getSimplePrice";
import { currencies, portfolio } from "./constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function Convertor() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(getSimplePrice, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 1;
  const selectedCoin = (searchParams.get("coin") ||
    "cardano") as keyof typeof portfolio;

  const getCalculatedConversion = (currency: (typeof currencies)[number]) => {
    if (!state || !currency) return null;
    const calculatedConversion = state[selectedCoin][currency] * amount;
    if (isNaN(state[selectedCoin][currency] * amount)) return null;
    return calculatedConversion;
  };

  const getLastUpdateTimestamp = () => {
    if (!state) return null;
    const date = new Date(state[selectedCoin].last_updated_at);
    return date;
  };

  const getUpdatedUrl = ({ amount = "", coin = "" }) => {
    const url = new URL(window.location.href);
    amount && url.searchParams.set("amount", amount);
    coin && url.searchParams.set("coin", coin);
    return url.toString();
  };

  return (
    <form action={formAction}>
      <div className="flex flex-row gap-2">
        {/* input amount */}
        <input
          required
          defaultValue={searchParams.get("amount") || 1}
          type="number"
          name="amount"
          max={portfolio[selectedCoin]}
          min={0}
          id="amount"
          className="p-1 w-1/2 border-2 border-black rounded-md"
          onChange={(e) => {
            router.push(getUpdatedUrl({ amount: e.currentTarget.value }));
          }}
        />

        <hr />
        <select
          className="p-1 w-1/2 border-2 border-black rounded-md"
          name="coin"
          id="coin"
          onChange={(e) => {
            router.push(getUpdatedUrl({ coin: e.currentTarget.value }));
          }}
          defaultValue={selectedCoin}
        >
          {/* selector for coins */}
          {Object.keys(portfolio).map((coin) => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))}
        </select>

        <button
          className="p-1 w-1/2 border-2 border-black rounded-md bg-green-500/100"
          type="submit"
          aria-disabled={pending}
        >
          Convert
        </button>
      </div>

      <hr />
      {/* checboxes for currencies*/}
      <div className="flex  gap-2">
        {currencies.map((currency) => (
          <label
            key={currency}
            className="w-1/2 block text-sm font-semibold leading-6 text-gray-900"
          >
            <input
              type="checkbox"
              name="currencies"
              value={currency}
              className="mr-2"
            />
            {currency} {getCalculatedConversion(currency)}
            {/* update date */}
            <span className="text-xs text-gray-400">
              {getLastUpdateTimestamp()?.toISOString()}
            </span>
          </label>
        ))}
      </div>
    </form>
  );
}
