import ScrambleText from "@/components/pixel/ScrambleText";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ index, label, title, description, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-blue-bright">[{index}]</span>
          <span className="h-px w-8 bg-line" />
          {label}
        </span>
        <h2 className="font-pixel text-4xl uppercase leading-none tracking-tight sm:text-6xl">
          <ScrambleText text={title} />
        </h2>
        {description && <p className="max-w-xl text-pretty text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}
