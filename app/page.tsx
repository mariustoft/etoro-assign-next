// Server Component

import Convertor from "./convertor";

export default async function Page() {
  // const data = await convertCoinToCurrency(1, "cardano", "usd");

  return (
    <main>
      <Convertor />
    </main>
  );
}
