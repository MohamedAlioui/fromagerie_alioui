interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({ value, onChange, min = 1, max = 99 }: Props) => (
  <div className="flex items-center gap-2">
    <button
      onClick={() => onChange(Math.max(min, value - 1))}
      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
      style={{ color: 'hsl(var(--foreground))' }}
    >
      −
    </button>
    <span className="w-8 text-center font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>
      {value}
    </span>
    <button
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
      style={{ color: 'hsl(var(--foreground))' }}
    >
      +
    </button>
  </div>
);

export default QuantitySelector;
