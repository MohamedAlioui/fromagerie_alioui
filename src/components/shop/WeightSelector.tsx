import type { WeightOption } from '@/types/shop';

interface Props {
  options: WeightOption[];
  selected: WeightOption | null;
  onSelect: (option: WeightOption) => void;
}

const WeightSelector = ({ options, selected, onSelect }: Props) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => (
      <button
        key={opt.label}
        onClick={() => onSelect(opt)}
        className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
          selected?.label === opt.label
            ? 'border-primary text-primary-foreground'
            : 'border-border hover:border-primary'
        }`}
        style={
          selected?.label === opt.label
            ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
            : { background: 'transparent', color: 'hsl(var(--foreground))' }
        }
        disabled={opt.stock === 0}
      >
        {opt.label}
        {opt.stock === 0 && <span className="ml-1 text-xs opacity-60">(rupture)</span>}
      </button>
    ))}
  </div>
);

export default WeightSelector;
