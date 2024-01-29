"use client";

import {
  DEFAULT_SELECTED_COIN,
  DEFAULT_SELECTED_CURRENCY,
  PORTFOLIO,
} from "../constants";

import { useFormState, useFormStatus } from "react-dom";
import { getCalculatedConversion } from "../actions/getCalculatedConversion";
import { getUpdatedUrl } from "../tools/getUpdatedUrl";
import { useSearchParams } from "next/navigation";
import { getSupportedCurrencies } from "../actions/getSupportedCurrencies";

export default function Convertor(props: {
  calculatedConversion?: Awaited<ReturnType<typeof getCalculatedConversion>>;
  supportedCurrencies?: Awaited<ReturnType<typeof getSupportedCurrencies>>;
}) {
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();
  const [calculatedConversion, formAction] = useFormState(
    getCalculatedConversion,
    props.calculatedConversion
  );

  const selectedAmount = searchParams.get("selectedAmount") || 1;
  const selectedCoin =
    searchParams.get("selectedCoin") || DEFAULT_SELECTED_COIN;

  const selectedCurrency =
    searchParams.get("selectedCurrency") || DEFAULT_SELECTED_CURRENCY;

  return (
    <section className="w-full p-4">
      <form
        action={formAction}
        className="flex flex-col md:flex-row justify-start relative gap-2"
      >
        {/* input amount */}
        <input
          required
          autoFocus
          value={selectedAmount}
          type="number"
          name="amount"
          max={searchParams.get(selectedCoin) ?? PORTFOLIO[selectedCoin]}
          min={0}
          id="amount"
          onChange={(e) =>
            window.history.replaceState(
              null,
              "",
              getUpdatedUrl({
                selectedAmount: e.currentTarget.value,
              })
            )
          }
          className="p-2 text-xl font-black w-30 appearance-none border-2 border-black rounded-md "
        />

        <select
          className="p-2 text-xl font-black w-30 appearance-none border-2 border-black rounded-md"
          required
          name="coin"
          value={selectedCoin}
          onChange={(e) =>
            window.history.replaceState(
              null,
              "",
              getUpdatedUrl({
                selectedCoin: e.currentTarget.value,
              })
            )
          }
        >
          {Object.keys(PORTFOLIO).map((coin) => {
            return (
              <option
                key={coin}
                className="flex items-center justify-between bg-green cursor-pointer hover:text-green-500"
                value={coin}
              >
                {coin}
              </option>
            );
          })}
        </select>

        <select
          className="p-2 text-xl font-black w-30 appearance-none border-2 border-black rounded-md"
          required
          name="currency"
          value={selectedCurrency}
          onChange={(e) =>
            window.history.replaceState(
              null,
              "",
              getUpdatedUrl({
                selectedCurrency: e.currentTarget.value,
              })
            )
          }
        >
          {props.supportedCurrencies?.map((currency) => (
            <option
              key={currency}
              className="flex items-center justify-between bg-green cursor-pointer hover:text-green-500"
              value={currency}
            >
              {currency}
            </option>
          ))}
        </select>

        <button
          className="text-xlmd:text-xs font-bold b-1 bg-black border-green-500 border-2 rounded-md px-2 hover:bg-green-500 text-white"
          type="submit"
          disabled={pending}
        >
          Convert
        </button>

        {calculatedConversion ? (
          <span
            className={
              "text-xl font-black  m-0" +
              (calculatedConversion === null ? "invisible" : "")
            }
            hidden={calculatedConversion === null}
          >
            Total // {calculatedConversion?.amount} {calculatedConversion?.coin}{" "}
            is
            <br />
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: calculatedConversion?.currency,
            }).format(Number(calculatedConversion?.total))}
          </span>
        ) : null}
      </form>
    </section>
  );
}
