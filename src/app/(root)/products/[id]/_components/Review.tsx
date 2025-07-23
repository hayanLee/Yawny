import { Star } from 'lucide-react';

const Review = () => {
  return (
    <div className='border-b border-gray-200 last:border-b-0 flex flex-col gap-2 p-4'>
      {/* 별점 */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-1'>
          <Star fill='' />
          <Star fill='' />
          <Star fill='' />
          <Star fill='' />
          <Star />
        </div>
        <p className='text-sm text-gray-500'>2025-07-23</p>
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-500'>user***</p>
          <p>
            사이즈 : <span className='font-semibold'>M</span>
          </p>
        </div>
        <div className='aspect-square w-16 lg:w-20  bg-yellow-300'>img</div>
      </div>

      <p className='text-sm'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );
};

export default Review;
