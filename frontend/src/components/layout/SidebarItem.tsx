import { ReactNode } from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  children: ReactNode;
  to: string;
  active?: boolean;
}

export default function SidebarItem({
  children,
  to,
  active = false,
}: SidebarItemProps) {
  return (
    <Link
      to={to}
      className="no-underline text-white rounded-md p-3 transition-colors font-semibold"
      style={{
        backgroundColor: 'var(--brand-primary)',
        display: 'block',
      }}
    >
      <span className="flex gap-5 items-center">
        {children} {active ? <ChevronRight /> : null}
      </span>
    </Link>
  );
}
