"use client";

import {
  DEFAULT_SELECTED_COIN,
  DEFAULT_SELECTED_CURRENCY,
  PORTFOLIO,
} from "../constants";

import { useFormState, useFormStatus } from "react-dom";
import { getSimplePrice } from "../actions/getSimplePrice";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupportedCurrencies } from "../actions/getSupportedCurrencies";
import { getUpdatedUrl } from "../tools/getUpdatedUrl";

export default function Convertor(props: {
  supportedCurrencies?: Awaited<ReturnType<typeof getSupportedCurrencies>>;
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [price, formAction] = useFormState(getSimplePrice, null);
  const searchParams = useSearchParams();

  const amount = Number(searchParams.get("amount")) || 1;
  const selectedCoin = searchParams.get("coin") || DEFAULT_SELECTED_COIN;

  return (
    <form
      action={formAction}
      onChange={(e) => {
        const formData = new FormData(e.currentTarget);
        // console.log("formData", formData);
        router.push(
          getUpdatedUrl({
            currencies: formData.getAll("currencies") as string[],
            coin: formData.get("coin") as string,
          })
        );
      }}
      className="w-5/6 gap-2"
    >
      <h1>Convertor</h1>
      <section className="flex flex-row gap-2">
        {/* input amount */}
        <input
          required
          defaultValue={amount}
          type="number"
          name="amount"
          max={PORTFOLIO[selectedCoin]}
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
            e.preventDefault();
          }}
          value={selectedCoin}
        >
          {/* selector for coins */}
          {Object.keys(PORTFOLIO).map((coin) => (
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
      </section>
    </form>
  );
}
