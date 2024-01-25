import PortfoliuValues from "../components/portfoliu-value";
import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";

export const revalidate = 60 * 60;

export default async function Page() {
  const portfolioValue = await calculatePortfolioValue();

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <PortfoliuValues portfolioValue={portfolioValue} />
    </main>
  );
}
