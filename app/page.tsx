import { Suspense } from "react";
import { getSupportedCurrencies } from "./actions/getSupportedCurrencies";
import Convertor from "./components/convertor";
import Portfolio from "./components/portfolio";

export const revalidate = 60 * 60;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const supportedCurrencies = await getSupportedCurrencies();

  if (!supportedCurrencies)
    return "Api error, too many requests, please wait a minute and try again";

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Portfolio searchParams={props.searchParams} />
      <Suspense fallback={null}>
        <Convertor supportedCurrencies={supportedCurrencies} />
      </Suspense>
    </main>
  );
}
