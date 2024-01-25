// revalidate cache every hour
import { PORTFOLIO } from "../constants";

const revalidate = 60 * 60;
const getPortfolioValue = async () => {
  const url = new URL(process.env.API_URL + "/simple/price");

  url.searchParams.set("ids", Object.keys(PORTFOLIO).join(","));
  url.searchParams.set("vs_currencies", "usd");
  url.searchParams.set("include_24hr_change", "true");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (response.status !== 200) throw new Error();

    const data = await response.json();

    // add all the values together
    const total = Object.keys(data).reduce(
      (acc, key) => acc + data[key].usd * PORTFOLIO[key],
      0
    );

    return total;
  } catch {
    return null;
  }
};

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const total = await getPortfolioValue();

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Portfolio Value</h1>
      <h2 className="text-4xl font-bold">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total || 0)}
      </h2>
    </main>
  );
}
