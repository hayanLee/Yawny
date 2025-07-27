import Review from '../../products/[id]/_components/Review';
import SectionHeader from '../_components/SectionHeader';
const reviewItems = [
  {
    id: 1,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    rating: 5,
    review: '리뷰 내용',
  },
  {
    id: 2,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    rating: 5,
    review: '리뷰 내용',
  },
  {
    id: 3,
    name: '상품명',
    option: '사이즈',
    orderNumber: '1234567890',
    orderDate: '2025-01-01',
    rating: 5,
    review: '리뷰 내용',
  },
];

const ReviewPage = () => {
  return (
    <div className='gap-4'>
      <SectionHeader title='작성한 리뷰' />
      <div className='flex flex-col divide-y divide-gray-300'>
        {reviewItems.map((review) => (
          <Review key={review.id} isOwner />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
