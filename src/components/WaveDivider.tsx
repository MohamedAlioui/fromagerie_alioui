const WaveDivider = ({ flip = false, className = '' }: { flip?: boolean; className?: string }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
      <path
        d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
        style={{ fill: 'var(--divider-fill)' }}
      />
    </svg>
  </div>
);

export default WaveDivider;
