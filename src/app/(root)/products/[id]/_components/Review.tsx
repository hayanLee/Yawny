import { Star } from 'lucide-react';

const Review = () => {
  return (
    <div className='border-b border-gray-200 last:border-b-0 flex flex-col gap-2 p-4'>
      {/* 별점 */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-1'>
          <Star size={16} fill='black' />
          <Star size={16} fill='black' />
          <Star size={16} fill='black' />
          <Star size={16} />
          <Star size={16} />
        </div>
        <p className='text-sm text-gray-500'>2025-07-23</p>
      </div>

      <div className='flex items-center justify-between text-sm text-gray-500'>
        <div>
          <p>user***</p>
          <p>
            사이즈 : <span className='font-semibold text-black'>M</span>
          </p>
        </div>
        <div className='w-16 h-12 lg:w-16 lg:h-16 bg-yellow-300'>img</div>
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
