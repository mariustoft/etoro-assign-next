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
import { useRouter } from "next/navigation";

export default function Convertor(props: {
  supportedCurrencies: Awaited<ReturnType<typeof getSupportedCurrencies>>;
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [price, formAction] = useFormState(getSimplePrice, null);

  const amount = Number(props.searchParams["amount"]) || 1;
  const selectedCoin = props.searchParams["coin"] || DEFAULT_SELECTED_COIN;
  const selectedCurrencies = props.searchParams["currencies"] || [
    DEFAULT_SELECTED_CURRENCY,
  ];
  const isOpen = Boolean(Number(props.searchParams["open"]));

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
    open?: "1" | "0";
  }) => {
    const url = new URL(window.location.href);
    args.amount && url.searchParams.set("amount", args.amount);
    args.coin && url.searchParams.set("coin", args.coin);

    args.currencies &&
      url.searchParams.set("currencies", args.currencies.join(","));
    console.log(args.open);

    args.open && url.searchParams.set("open", args.open);
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
          })
        );
        e.stopPropagation();
      }}
      className="w-5/6 gap-2"
    >
      <section className="flex flex-row gap-2">
        {/* input amount */}
        <input
          required
          defaultValue={props.searchParams["amount"] || 1}
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
        onClick={(e) => {
          router.push(getUpdatedUrl({ open: !e.currentTarget.open ? "1" : "0"}));
        }}
      >
        <summary className="flex flex-row flex-wrap gap-2 cursor-pointer w-122 h-100 bg-green-500/100 rounded-md">
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
