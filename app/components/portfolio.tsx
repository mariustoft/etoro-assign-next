import Link from "next/link";
import { PORTFOLIO } from "../constants";

export default function Portfolio(props: {
  searchParams: { [key: string]: string };
}) {
  return (
    <section className="w-full p-4 bg-black text-white">
      <header className="flex flex-row items-baseline justify-start">
        <h2 className="text-2xl font-bold  text-white my-1">Portfolio //</h2>
        <p className="text-xs font-bold text-green-100 m-1">
          {Object.entries(PORTFOLIO).length} Coins
        </p>
  
      </header>

      <div className="w-4/6 flex flex-wrap items-center justify-start">
        {Object.entries(PORTFOLIO).map(([key, value]) => {
          return (
            <Link
              className="flex flex-row items-center justify-between bg-green"
              key={key}
              href={{
                query: {
                  ...props.searchParams,
                  coin: key,
                  amount: value.toString(),
                },
              }}
            >
              <button className="flex flex-row items-center justify-between gap-2 mr-4 rounded hover:text-green-500">
                <p className="font-bold">{key}</p>
                <p className="text-lg">{value}</p>
              </button>
            </Link>
          );
        })}
      </div>

      <Link
          replace
          className="text-xs font-bold b-1 border-green-500 border-2 rounded-md px-2 hover:bg-green-500 hover:text-white"
          href={{
            pathname: "/results",
            query: {
              ...props.searchParams,
            },
          }}
        >
         { "Get total value in USD ⮕".toUpperCase() }
        </Link>
    </section>
  );
}
