import { getSupportedCurrencies } from "./actions/getSupportedCurrencies";
import Convertor from "./components/convertor";
import Portfolio from "./components/portfolio";

export const revalidate = 60 * 60;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  const supportedCurrencies = await getSupportedCurrencies();

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Portfolio searchParams={props.searchParams} />
      <Convertor supportedCurrencies={supportedCurrencies} />
    </main>
  );
}
