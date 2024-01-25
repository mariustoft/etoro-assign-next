import { Suspense } from "react";
import Convertor from "./components/convertor";
import { getSupportedCurrencies } from "./actions/getSupportedCurrencies";
import Portfolio from "./components/portfolio";
import Tracker from "./components/tracker";

// revalidate cache every hour
export const revalidate = 60 * 60;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const supportedCurrencies = await getSupportedCurrencies();

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Portfolio searchParams={props.searchParams} />
      <Suspense fallback={null}>
        <Convertor
          supportedCurrencies={supportedCurrencies}
          searchParams={props.searchParams}
        />
        {/* <Tracker searchParams={props.searchParams}
          supportedCurrencies={supportedCurrencies}
        /> */}
      </Suspense>
    </main>
  );
}
