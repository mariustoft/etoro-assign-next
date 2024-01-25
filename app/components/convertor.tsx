"use client";

import {
  DEFAULT_SELECTED_COIN,
  DEFAULT_SELECTED_CURRENCY,
  PORTFOLIO,
  CURRENCIES,
} from "../constants";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { getCalculatedConversion } from "../actions/getCalculatedConversion";

export default function Convertor(props: {
  searchParams: { [key: string]: string };
}) {
  const { pending } = useFormStatus();
  const [calculatedConversion, formAction] = useFormState(
    getCalculatedConversion,
    null
  );

  const amount = props.searchParams.amount || 1;
  const selectedCoin = props.searchParams.coin || DEFAULT_SELECTED_COIN;
  const selectedCurrency =
    props.searchParams.selectedCurrency || DEFAULT_SELECTED_CURRENCY;

  const selectedCurrencyOpen = Boolean(
    Number(props.searchParams.selectedCurrencyOpen)
  );

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
          defaultValue={amount}
          type="number"
          name="amount"
          max={PORTFOLIO[selectedCoin]}
          min={0}
          id="amount"
          className="p-2 text-xl font-black w-30 appearance-none border-2 border-black rounded-md "
        />

        <div className="flex gap-2 relative w-1/5 rounded-md select-none">
          <details className="flex flex-col gap-2 md:absolute top-0">
            <summary className="flex items-center gap-2 cursor-pointer w-200 h-100 h-100 rounded-md">
              <span className="text-4xl font-bold hover:text-green-500 ">
                {selectedCoin}
              </span>
              <span className="text-2xl self-end px-1 font-bold hover:text-red-500 rotate-90">
                ⮕
              </span>
              <input type="hidden" name="coin" value={selectedCoin} />
            </summary>

            {Object.keys(PORTFOLIO)
              .filter((x) => x !== selectedCoin)
              .map((coin) => (
                <Link
                  replace
                  key={coin}
                  className="flex items-center justify-between bg-green cursor-pointer hover:text-green-500"
                  href={{
                    query: {
                      ...props.searchParams,
                      coin,
                    },
                  }}
                >
                  <span className="text-lg font-bold">{coin}</span>
                </Link>
              ))}
          </details>
        </div>

        <div className="flex gap-2 relative w-1/6 rounded-md select-none">
          <details
            className="flex flex-col gap-2 md:absolute top-0"
            open={selectedCurrencyOpen}
          >
            <summary className="flex items-center gap-2 cursor-pointer w-200 h-100 h-100 rounded-md">
              <Link
                replace
                href={{
                  query: {
                    ...props.searchParams,
                    selectedCurrencyOpen: selectedCurrencyOpen ? "0" : "1",
                  },
                }}
                className="text-4xl font-bold hover:text-green-500"
              >
                {selectedCurrency}
              </Link>
              <span className="text-2xl self-end px-1 font-bold hover:text-red-500 rotate-90">
                ⮕
              </span>
              <input type="hidden" name="currency" value={selectedCurrency} />
            </summary>

            {CURRENCIES.filter((x) => x !== selectedCurrency).map(
              (currency) => (
                <Link
                  replace
                  key={currency}
                  className="flex items-center justify-between bg-green cursor-pointer hover:text-green-500"
                  href={{
                    query: {
                      ...props.searchParams,
                      selectedCurrency: currency,
                    },
                  }}
                >
                  <span className="text-lg font-bold">{currency}</span>
                </Link>
              )
            )}
          </details>
        </div>

        <button
          className="text-xlmd:text-xs font-bold b-1 bg-black border-green-500 border-2 rounded-md px-2 hover:bg-green-500 text-white"
          type="submit"
          disabled={pending}
        >
          Convert
        </button>

        <span
          className={
            "text-xl font-black  m-0" +
            (calculatedConversion === null ? "invisible" : "")
          }
          hidden={calculatedConversion === null}
        >
          Total // <br /> {calculatedConversion} {selectedCurrency}
        </span>
      </form>
    </section>
  );
}
