import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Controller, useFormContext } from 'react-hook-form';

const CheckoutAgreementGroup = () => {
  const { control, setValue, watch, trigger } = useFormContext();
  const agreements = watch('agreements');

  const handleSelectAll = (checked: boolean) => {
    setValue('agreements', {
      orderConfirm: checked,
      privacyCollection: checked,
      privacyThirdParty: checked,
      paymentService: checked,
    });
    trigger('agreements');
  };

  const handleAgreementChange = (fieldName: string, checked: boolean) => {
    setValue(`agreements.${fieldName}`, checked, { shouldValidate: true });
    // 체크 해제 시 해당 필드만 재검증
    if (!checked) {
      trigger(`agreements.${fieldName}`);
    }
  };

  const allChecked =
    agreements.orderConfirm &&
    agreements.privacyCollection &&
    agreements.privacyThirdParty &&
    agreements.paymentService;

  return (
    <div className='space-y-2 text-gray-600'>
      <div className='flex items-center gap-2'>
        <Checkbox
          id='allAgree'
          checked={allChecked}
          onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
        />
        <Label htmlFor='allAgree'>모두 동의하기</Label>
      </div>

      <Controller
        control={control}
        rules={{ required: true }}
        name='agreements.orderConfirm'
        render={({ field }) => (
          <div className='flex items-center gap-2'>
            <Checkbox
              id='orderConfirm'
              checked={field.value}
              onCheckedChange={(checked) => handleAgreementChange('orderConfirm', checked as boolean)}
            />
            <Label htmlFor='orderConfirm'>주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.</Label>
          </div>
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name='agreements.privacyCollection'
        render={({ field }) => (
          <div className='flex items-center gap-2'>
            <Checkbox
              id='privacyCollection'
              checked={field.value}
              onCheckedChange={(checked) => handleAgreementChange('privacyCollection', checked as boolean)}
            />
            <Label htmlFor='privacyCollection'>개인정보 수집/이용 동의</Label>
          </div>
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name='agreements.privacyThirdParty'
        render={({ field }) => (
          <div className='flex items-center gap-2'>
            <Checkbox
              id='privacyThirdParty'
              checked={field.value}
              onCheckedChange={(checked) => handleAgreementChange('privacyThirdParty', checked as boolean)}
            />
            <Label htmlFor='privacyThirdParty'>개인정보 제3자 제공 동의</Label>
          </div>
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name='agreements.paymentService'
        render={({ field }) => (
          <div className='flex items-center gap-2'>
            <Checkbox
              id='paymentService'
              checked={field.value}
              onCheckedChange={(checked) => handleAgreementChange('paymentService', checked as boolean)}
            />
            <Label htmlFor='paymentService'>결제대행 서비스 이용 동의</Label>
          </div>
        )}
      />
    </div>
  );
};

export default CheckoutAgreementGroup;
