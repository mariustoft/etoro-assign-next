// Server Component

import { Suspense } from "react";
import Convertor from "./convertor";

export default async function Page() {
  // const data = await convertCoinToCurrency(1, "cardano", "usd");

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Convertor />
      </Suspense>
    </main>
  );
}
