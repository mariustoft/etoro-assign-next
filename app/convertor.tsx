"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  getSimplePrice,
  getSupportedCurrencies,
} from "./actions/getSimplePrice";
import {
  DEFAULT_SELECTED_COIN,
  DEFAULT_SELECTED_CURRENCY,
  PORTFOLIO,
} from "./constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function Convertor(props: {
  supportedCurrencies: Awaited<ReturnType<typeof getSupportedCurrencies>>;
}) {
  const { pending } = useFormStatus();
  const [price, formAction] = useFormState(getSimplePrice, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 1;
  const selectedCoin = searchParams.get("coin") || DEFAULT_SELECTED_COIN;
  const selectedCurrencies = searchParams.get("currencies")?.split(",") || [
    DEFAULT_SELECTED_CURRENCY,
  ];
  const isOpen = Boolean(Number(searchParams.get("open")));

  const getCalculatedConversion = (currency?: string) => {
    if (!price || !currency) return null;
    const calculatedConversion = price[selectedCoin][currency] * amount;
    if (isNaN(price[selectedCoin][currency] * amount)) return null;
    return calculatedConversion;
  };

  const getUpdatedUrl = (args: {
    amount?: string;
    coin?: string;
    currencies?: string[];
    open?: boolean;
  }) => {
    const url = new URL(window.location.href);
    args.amount && url.searchParams.set("amount", args.amount);
    args.coin && url.searchParams.set("coin", args.coin);

    args.currencies &&
      url.searchParams.set("currencies", args.currencies.join(","));

    args.open ?? url.searchParams.set("open", args.open ? "1" : "0");
    return url.toString();
  };

  return (
    <form
      action={formAction}
      onChange={(e) => {
        const formData = new FormData(e.currentTarget);

        router.push(
          getUpdatedUrl({
            currencies: formData.getAll("currencies") as string[],
            open: formData.get("open") === "1",
          })
        );
        e.stopPropagation();
      }}
    >
      <section className="flex flex-row gap-2">
        {/* input amount */}
        <input
          required
          defaultValue={searchParams.get("amount") || 1}
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
          }}
          defaultValue={selectedCoin}
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

      <hr />
      {/* checboxes for currencies*/}
      <details
        className="flex flex-col gap-2"
        open={isOpen}
        onChange={(e) => {
          router.push(getUpdatedUrl({ open: e.currentTarget.open }));
        }}
      >
        <summary
          className="flex flex-row flex-wrap gap-2 cursor-pointer w-122 h-100 bg-green-500/100 rounded-md"
          onClick={() => {
            router.push(getUpdatedUrl({ open: !isOpen }));
          }}
        >
          {props.supportedCurrencies
            .filter((currency) => selectedCurrencies.includes(currency))
            .map((currency) => (
              <label key={currency} className="mr-10">
                {currency} {getCalculatedConversion(currency)}
              </label>
            ))}
        </summary>

        <div className="lex flex-row flex-wrap gap-2">
          {props.supportedCurrencies.map((currency) => (
            <label key={currency}>
              <input
                type="checkbox"
                name="currencies"
                defaultChecked={selectedCurrencies.includes(currency)}
                value={currency}
                className="w-8"
                onChange={(e) => {
                  router.push(
                    getUpdatedUrl({ currencies: [e.currentTarget.value] })
                  );
                }}
              />
              {currency}
            </label>
          ))}
        </div>
      </details>
    </form>
  );
}
