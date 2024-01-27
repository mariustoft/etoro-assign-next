"use client";

import { useFormState, useFormStatus } from "react-dom";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";
import Link from "next/link";
import { PORTFOLIO } from "../constants";

export default function PortfolioValues(props: {
  portfolioValue?: Awaited<ReturnType<typeof calculatePortfolioValue>>;
  searchParams: { [key: string]: string };
}) {
  const [portfolioValue, formAction] = useFormState(
    calculatePortfolioValue,
    props.portfolioValue
  );

  const { pending } = useFormStatus();

  return (
    <form className="w-full p-4 gap-2" action={formAction}>
      {Object.keys(props.searchParams).map((key) => {
        if (!Object.keys(PORTFOLIO).includes(key)) return null;
        return (
          <input
            key={key}
            type="hidden"
            name={key}
            value={props.searchParams[key]}
          />
        );
      })}

      <h1 className="text-2xl font-bold">Portfolio Value</h1>
      <div className="flex py-1">
        <h2 className="text-4xl font-bold">
          {Intl.NumberFormat("ds-DK", {
            style: "currency",
            currency: "USD",
          }).format(portfolioValue || 0)}
        </h2>
        <sub className="text-xs">
          {new Date().toLocaleString("da-DK", {
            timeZoneName: "short",
          })}
        </sub>
      </div>

      <button
        disabled={pending}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh
      </button>

      <Link replace href="/">
        home
      </Link>
    </form>
  );
}
