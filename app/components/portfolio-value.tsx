"use client";

import { useFormState } from "react-dom";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";

export default function PortfolioValues(props: {
  portfolioValue?: Awaited<ReturnType<typeof calculatePortfolioValue>>;
}) {
  const [portfolioValue, formAction] = useFormState(
    calculatePortfolioValue,
    props.portfolioValue
  );

  return (
    <form className="w-full p-4 gap-2" action={formAction}>
      <h1 className="text-2xl font-bold">Portfolio Value</h1>
      <h2 className="text-4xl font-bold">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(portfolioValue || 0)}
      </h2>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Refresh
      </button>
    </form>
  );
}
