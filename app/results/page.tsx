import PortfolioValues from "../components/portfolio-value";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";
import Portfolio from "../components/portfolio";
import { Suspense } from "react";

export const revalidate = 0;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const portfolioValue = await calculatePortfolioValue(props.searchParams);

  if (!portfolioValue)
    return "Api error, too many requests, please wait a minute and try again";

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Suspense fallback={null}>
        <Portfolio searchParams={props.searchParams} />
        <PortfolioValues portfolioValue={portfolioValue} />
      </Suspense>
    </main>
  );
}
