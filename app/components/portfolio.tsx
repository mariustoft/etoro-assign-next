"use client";

import { useRouter } from "next/navigation";
import { PORTFOLIO } from "../constants";
import { getUpdatedUrl } from "../tools/getUpdatedUrl";

export default function Convertor(props: {
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();

  return (
    <div>
      {Object.entries(PORTFOLIO).map(([key, value]) => {
        return (
          <button
            key={key}
            className="flex flex-row items-center justify-between"
            onClick={(e) => {
              router.push(
                getUpdatedUrl({ coin: key, amount: value.toString() })
              );
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <p>{key}</p>
            <p>{value}</p>
          </button>
        );
      })}
    </div>
  );
}
