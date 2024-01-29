import PortfolioValues from "../components/portfolio-value";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";
import Portfolio from "../components/portfolio";
import { Suspense } from "react";

export const revalidate = 0;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const portfolioValue = await calculatePortfolioValue(props.searchParams);

 if (!portfolioValue) return "Api error, too many requests"

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Portfolio searchParams={props.searchParams} />
      <Suspense fallback={null}>
        <PortfolioValues portfolioValue={portfolioValue} />
      </Suspense>
    </main>
  );
}
