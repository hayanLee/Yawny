import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import SectionHeader from '../../mypage/_components/SectionHeader';
import DaumPostCode from './DaumPostCode';

export interface DaumPostcodeData {
  zonecode: string;
  address: string;
}

const DeliveryForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const handleAddressComplete = (data: DaumPostcodeData) => {
    setValue('postalCode', data.zonecode);
    setValue('address', data.address);
  };

  return (
    <section>
      <SectionHeader title='배송 정보' />
      <div className='flex flex-col gap-3 text-gray-700'>
        <div className='grid grid-cols-[150px_auto] items-center'>
          <span className='font-semibold p-2 shrink-0'>
            수령인<span className='text-red-400'>*</span>
          </span>
          <Input
            placeholder='수령인'
            {...register('recipient', { required: '수령인을 작성해주세요.' })}
            className={errors.recipient && 'placeholder:text-red-500'}
          />
        </div>
        <div className='grid grid-cols-[150px_auto] items-center'>
          <span className='font-semibold p-2 shrink-0'>
            배송지<span className='text-red-400'>*</span>
          </span>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Input
                placeholder='우편번호'
                {...register('postalCode', { required: '우편번호를 입력해주세요.' })}
                readOnly
                className={cn('bg-gray-50', errors.postalCode && 'placeholder:text-red-500')}
              />
              <DaumPostCode onComplete={handleAddressComplete} />
            </div>
            <Input
              placeholder='주소'
              {...register('address', { required: '주소란을 입력해주세요.' })}
              readOnly
              className={cn('bg-gray-50', errors.address && 'placeholder:text-red-500')}
            />
            <Input
              placeholder='상세 주소'
              {...register('addressDetail', { required: '상세 주소를 입력해주세요.' })}
              className={errors.addressDetail && 'placeholder:text-red-500'}
            />
          </div>
        </div>
        <div className='grid grid-cols-[150px_auto] items-center'>
          <span className='font-semibold p-2 shrink-0'>
            연락처<span className='text-red-400'>*</span>
          </span>
          <Input
            placeholder='연락처'
            {...register('phoneNumber', { required: '연락처를 입력해주세요.' })}
            className={errors.phoneNumber && 'placeholder:text-red-500'}
          />
        </div>
        <div className='grid grid-cols-[150px_auto] items-center'>
          <span className='font-semibold p-2 shrink-0'>배송 요청사항</span>
          <Input placeholder='배송 요청사항' {...register('deliveryRequest')} />
        </div>
      </div>
    </section>
  );
};

export default DeliveryForm;
