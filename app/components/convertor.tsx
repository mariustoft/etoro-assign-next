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
import Tracker from "./tracker";

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

  const selectedCurrencies = searchParams.get("currencies") || [
    DEFAULT_SELECTED_CURRENCY,
  ];
  const isOpen = Boolean(Number(searchParams.get("open")));

  const getCalculatedConversion = (currency?: string) => {
    if (!price || !currency || !selectedCoin) return null;
    const calculatedConversion = price[selectedCoin][currency] * amount;
    if (isNaN(price[selectedCoin][currency] * amount)) return null;
    return calculatedConversion;
  };

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

      {/* <Tracker price={price} searchParams={{}} /> */}
      <h1>Tracker</h1>
      {/* checboxes for currencies*/}
      <details
        className="flex flex-col gap-2"
        open={true}
        onClick={(e) => {
          router.push(
            getUpdatedUrl({ open: e.currentTarget.open ? "0" : "1" })
          );
          e.preventDefault();
        }}
      >
        <summary className="flex flex-row flex-wrap gap-2 cursor-pointer w-122 h-100 bg-green-500/100 rounded-md">
          {props?.supportedCurrencies
            ?.filter((currency) => selectedCurrencies.includes(currency))
            .map((currency) => (
              <label
                key={currency}
                className="mr-10 select-none cursor-pointer"
              >
                {currency} {getCalculatedConversion(currency)}
              </label>
            ))}
        </summary>

        <div className="flex flex-row flex-wrap gap-2">
          {props.supportedCurrencies?.map((currency) => (
            <label
              key={currency}
              className="w-1/6 flex align-middle p-2 border-2 border-grey rounded-md"
            >
              <input
                className="flex  mr-2 select-none"
                type="checkbox"
                name="currencies"
                checked={selectedCurrencies.includes(currency)}
                defaultValue={currency}
                onChange={(e) => {
                  router.push(
                    getUpdatedUrl({ currencies: [e.currentTarget.value] })
                  );
                  e.preventDefault();
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
