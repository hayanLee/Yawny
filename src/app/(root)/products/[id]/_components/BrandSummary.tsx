import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BrandSummaryProps {
  brandName: string;
  brandDescription: string;
  brandId: string;
}

const BrandSummary = ({ brandName, brandDescription, brandId }: BrandSummaryProps) => {
  return (
    <section className='flex flex-col md:flex-row md:items-center justify-between px-4 py-5 gap-2'>
      <div className='flex flex-col'>
        <p className='text-2xl font-bold'>{brandName}</p>
        <p className='text-sm text-gray-500'>{brandDescription}</p>
      </div>
      <Button asChild size={'sm'}>
        <Link href={`/brands/${brandId}`}>브랜드 페이지로 이동</Link>
      </Button>
    </section>
  );
};

export default BrandSummary;
