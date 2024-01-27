"use client";

import { useFormState, useFormStatus } from "react-dom";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";
import Link from "next/link";
import { PORTFOLIO } from "../constants";
import { useSearchParams } from "next/navigation";

export default function PortfolioValues(props: {
  // portfolioValue?: Awaited<ReturnType<typeof calculatePortfolioValue>>;
  // searchParams: { [key: string]: string };
}) {
  const searchParams = useSearchParams();

  const [portfolioValue, formAction] = useFormState(
    calculatePortfolioValue,
    null
  );

  const { pending } = useFormStatus();

  return (
    <form className="w-full p-4 gap-2" action={formAction}>
      {Object.keys(PORTFOLIO).map((key) => {
        if (!searchParams.has(key)) return null;
        return (
          <input
            key={key}
            type="hidden"
            name={key}
            value={searchParams.get(key)?.toString()}
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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Calculate
      </button>

      <Link replace href="/" className="hover:font-black">
        home
      </Link>
    </form>
  );
}
