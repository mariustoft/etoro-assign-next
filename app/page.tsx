// Server Component

import { Suspense } from "react";
import Convertor from "./convertor";
import { getSupportedCurrencies } from "./actions/getSimplePrice";

export default async function Page() {
  const supportedCurrencies = await getSupportedCurrencies();

  return (
    <main>
      <Suspense fallback={null}>
        <Convertor 
          supportedCurrencies={supportedCurrencies}
        />
      </Suspense>
    </main>
  );
}
