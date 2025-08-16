import { cn } from '@/lib/utils';

const SectionHeader = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('flex items-center justify-between border-b-3 mb-3', className)}>
      <h4 className='text-xl font-bold pb-2.5'>{title}</h4>
      {children}
    </div>
  );
};

export default SectionHeader;
