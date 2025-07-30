import { cn } from '@/lib/utils';

const SectionHeader = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={cn('flex border-b-3 mb-3', className)}>
      <h4 className='text-xl font-bold pb-2.5'>{title}</h4>
    </div>
  );
};

export default SectionHeader;
