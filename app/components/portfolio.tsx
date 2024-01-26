"use client";

import Link from "next/link";
import { PORTFOLIO } from "../constants";
import { getUpdatedUrl } from "../tools/getUpdatedUrl";
import { use } from "react";
import { useSearchParams } from "next/navigation";

export default function Portfolio(props: {
  searchParams: { [key: string]: string };
}) {
  const searchParams = useSearchParams();
  return (
    <section className="w-full p-4 bg-black text-white">
      <header className="flex flex-row items-baseline justify-start">
        <h2 className="text-2xl font-bold  text-white my-1">Portfolio //</h2>
        <p className="text-xs font-bold text-green-100 m-1">
          {Object.entries(PORTFOLIO).length} Coins
        </p>
      </header>

      <div className="w-4/6 flex flex-wrap items-center justify-start gap-2">
        {Object.entries(PORTFOLIO).map(([key, value]) => {
          return (
            <div
              className="flex flex-row items-center justify-between p-2"
              key={key}
            >
              <Link
                className="flex flex-row my-1 items-center justify-between bg-green"
                replace
                href={{
                  query: {
                    ...props.searchParams,
                    coin: key,
                    amount: searchParams.get(key) || value.toString(),
                    // [key]: searchParams.get(key) || value.toString(),
                  },
                }}
              >
                <button className="flex flex-row items-center justify-between gap-2 mr-1 rounded hover:text-green-500">
                  <p className="font-bold">{key}</p>
                </button>
              </Link>

              <input
                className="w-12 p-1 rounded text-black mx-2"
                type="number"
                defaultValue={props.searchParams[key] || value.toString()}
                onChange={(e) => {
                  window.history.replaceState(
                    null,
                    "",
                    getUpdatedUrl({
                      ...props.searchParams,
                      amount: e.currentTarget.value,
                      [key]: e.currentTarget.value,
                    })
                  );
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
            </div>
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
        {"Get total value in USD ⮕".toUpperCase()}
      </Link>
    </section>
  );
}
