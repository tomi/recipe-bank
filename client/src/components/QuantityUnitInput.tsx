import * as React from 'react';
import { Combobox, TextInput } from 'evergreen-ui';

import './QuantityUnitInput.css';

export interface QuantityUnitInputProps {
  qty: string;
  unit: string;
  validUnits: string[];
  onQtyChange: (value: string) => void;
  onUnitChange: (value: string) => void;
}

export const QuantityUnitInput: React.FC<QuantityUnitInputProps> = ({
  qty,
  unit,
  validUnits,
  onQtyChange,
  onUnitChange,
}) => {
  return (
    <div
      className="flex flex-row rounded-sm quantity-unit-input"
      style={{
        border: '1px solid rgba(67, 90, 111, 0.3)',
      }}
    >
      <TextInput
        className="border-none text-right pr-2 outline-none"
        name="text-input-name"
        value={qty}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onQtyChange(event.target.value)
        }
      />
      <span
        className="text-xl"
        style={{
          lineHeight: '32px',
          color: 'rgba(67, 90, 111, 0.3)',
        }}
      >
        |
      </span>
      <Combobox
        openOnFocus
        width={80}
        items={validUnits}
        onChange={onUnitChange}
        placeholder=""
        selectedItem={unit}
      />
    </div>
  );
};
