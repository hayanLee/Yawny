import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Star, X } from 'lucide-react';

const productInfo = {
  name: '상품명',
  option: 'M',
};

const ReviewEditPage = () => {
  return (
    <div>
      {/* 상품 정보 */}
      <div className='flex items-center gap-4 mb-4'>
        <div className='relative w-20 h-20 rounded overflow-hidden bg-yellow-400'>img</div>
        <div>
          <p className='font-bold'>{productInfo.name}</p>
          <p className='text-sm text-gray-500'>옵션: {productInfo.option}</p>
        </div>
      </div>

      <div className='flex items-center gap-1 mb-4'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={24} fill='black' />
        ))}
      </div>

      <Textarea placeholder='리뷰를 입력하세요' />

      {/* 이미지 업로드 */}
      <div className='mt-4'>
        <p className='text-sm font-semibold mb-2'>사진 업로드</p>
        <div className='flex gap-2 flex-wrap'>
          {[1, 2, 3].map((img) => (
            <div key={img} className='relative w-20 h-20 rounded overflow-hidden bg-yellow-400'>
              <span className='text-xs'>preview</span>
              <button className='absolute top-1 right-1 p-0.5 bg-white rounded-full shadow'>
                <X size={14} />
              </button>
            </div>
          ))}

          <label className='w-20 h-20 flex items-center justify-center rounded border border-dashed border-gray-300 cursor-pointer'>
            <span className='flex gap-1 items-center text-sm text-gray-400'>
              <Plus size={16} /> 추가
            </span>
            <Input type='file' accept='image/*' className='hidden' />
          </label>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-6'>
        <Button variant={'outline'}>취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
};

export default ReviewEditPage;
