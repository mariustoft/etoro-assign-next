export const PORTFOLIO = {
  cardano: 1,
  bitcoin: 1,
  ethereum: 1,
  solana: 1,
} as { [key: string]: number };

export const CURRENCIES = [
  "ada",
  "bch",
  "bnb",
  "btc",
  "dot",
  "eos",
  "eth",
  "eth",
  "link",
  "ltc",
  "xlm",
  "xrp",
  "usd",
] as const;

export const DEFAULT_SELECTED_COIN = "bitcoin";
export const DEFAULT_SELECTED_CURRENCY = "btc";
