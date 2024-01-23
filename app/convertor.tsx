"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getSimplePrice } from "./actions/getSimplePrice";
import { useState } from "react";
import { currencies, portfolio } from "./constants";

export default function Convertor() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(getSimplePrice, null);

  const [selectedCoin, setSelectedCoin] =
    useState<keyof typeof portfolio>("bitcoin");
  const [amount, setAmount] = useState(1);

  console.log(state);

  return (
    <form action={formAction}>
      {/* input amount */}
      <input
        required
        defaultValue={1}
        type="number"
        name="amount"
        id="amount"
        onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
      />

      <hr />
      <select
        name="coin"
        id="coin"
        onChange={(e) =>
          setSelectedCoin(
            e.currentTarget.ariaValueText as keyof typeof portfolio
          )
        }
      >
        {/* selector for coins */}
        {Object.keys(portfolio).map((coin) => (
          <option key={coin} aria-selected={coin === selectedCoin} value={coin}>
            {coin}
          </option>
        ))}
      </select>

      <hr />
      {/* checboxes for currencies*/}
      {currencies.map((currency) => (
        <label key={currency}>
          <input type="checkbox" name="currencies" value={currency} />
          {currency}
          {state && (
            <span>
              {state?.[selectedCoin]?.[currency]}
            </span>
          )}
        </label>
      ))}

      <hr />
      <button type="submit" aria-disabled={pending}>
        Convert
      </button>
    </form>
  );
}
