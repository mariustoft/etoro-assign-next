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

export default function Tracker(props: {
  supportedCurrencies?: Awaited<ReturnType<typeof getSupportedCurrencies>>;
  searchParams: { [key: string]: string };
  price: Awaited<ReturnType<typeof getSimplePrice>>;
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
        window.history.replaceState(
          null,
          "",
          getUpdatedUrl({
            currencies: formData.getAll("currencies") as string[],
            coin: formData.get("coin") as string,
          })
        );
      }}
      className="w-5/6 gap-2"
    >
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
