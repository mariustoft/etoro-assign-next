// Server Component

import { Suspense } from "react";
import Convertor from "./convertor";
import { getSupportedCurrencies } from "./actions/getSimplePrice";

export default async function Page(props: { searchParams: {[key: string]: string} }) {
  const supportedCurrencies = await getSupportedCurrencies();

  console.log("supportedCurrencies", props.searchParams);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
        <Convertor
          supportedCurrencies={supportedCurrencies}
          searchParams={props.searchParams}
        />
    </main>
  );
}
