export const PORTFOLIO = {
  cardano: 12,
  bitcoin: 22,
  ethereum: 32,
  solana: 52,
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
  "usd"
] as const;

export const DEFAULT_SELECTED_COIN = "bitcoin";
export const DEFAULT_SELECTED_CURRENCY = "btc";
