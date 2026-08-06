import type { ReactNode } from "react";

interface ReadingColumnProps {
  children: ReactNode;
  marginalia?: ReactNode;
  className?: string;
}

/**
 * The page's core measure: a ~560px reading column, with an optional right
 * gutter for marginalia annotations — the printed-page device the
 * reference implies but never itself uses.
 */
export function ReadingColumn({ children, marginalia, className = "" }: ReadingColumnProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_1fr] gap-x-[32px] ${className}`}>
      <div className="reading-measure">{children}</div>
      {marginalia && <div className="hidden lg:block pt-[8px]">{marginalia}</div>}
    </div>
  );
}
