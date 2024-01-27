import PortfolioValues from "../components/portfolio-value";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";
import Portfolio from "../components/portfolio";

export const revalidate = 60 * 60;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const portfolioValue = await calculatePortfolioValue();

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Portfolio searchParams={props.searchParams} />
      <PortfolioValues
        portfolioValue={portfolioValue}
        searchParams={props.searchParams}
      />
    </main>
  );
}
