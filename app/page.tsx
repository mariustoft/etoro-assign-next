// Server Component

import { Suspense } from "react";
import Convertor from "./convertor";
import { getSupportedCurrencies } from "./actions/getSimplePrice";

// revalidate chash every 5 seconds
export const revalidate = 3600 

export default async function Page(props: { searchParams: {[key: string]: string} }) {
  const supportedCurrencies = await getSupportedCurrencies();

  console.log("supportedCusearchParams", props.searchParams);
  console.log("supportedCurrencies", supportedCurrencies);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Suspense fallback={null}>
        <Convertor
          supportedCurrencies={supportedCurrencies}
          searchParams={props.searchParams}
        />
      </Suspense>
    </main>
  );
}
