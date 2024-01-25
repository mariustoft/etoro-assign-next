import Link from "next/link";
import { PORTFOLIO } from "../constants";

export default function Portfolio(props: {
  searchParams: { [key: string]: string };
}) {
  return (
    <section className="flex items-center justify-center w-full bg-black text-white">
      <h1 className="text-4xl mb-8 text-green-500">Portfolio</h1>
      {Object.entries(PORTFOLIO).map(([key, value]) => {
        return (
          <Link
            className="flex flex-row items-center justify-between bg-green"
            key={key}
            href={{
              query: {
                ...props.searchParams,
                coin: key,
                value: value.toString(),
              },
            }}
          >
            <button className="flex flex-row items-center justify-between bg-green max-w-md px-4 py-2 mb-4 rounded">
              <p className="text-lg font-bold">{key}</p>
              <p className="text-lg">{value}</p>
            </button>
          </Link>
        );
      })}
    </section>
  );
}
