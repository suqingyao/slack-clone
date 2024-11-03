import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { cva, type VariantProps } from 'class-variance-authority';

import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>['variant'];
}

const sidebarItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#F9EDFFCC]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const SidebarItem = ({ label, id, icon: Icon, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      variant="transparent"
      asChild
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
