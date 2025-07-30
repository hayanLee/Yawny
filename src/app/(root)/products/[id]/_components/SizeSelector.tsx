'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SizeSelectorProps {
  sizes: string[];
  onSizeSelect?: (size: string) => void;
  selectedSize?: string;
}

const SizeSelector = ({ sizes, onSizeSelect, selectedSize }: SizeSelectorProps) => {
  return (
    <>
      <label className='text-sm font-medium'>Size</label>
      <Select value={selectedSize} onValueChange={onSizeSelect}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='사이즈를 선택해주세요' />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SizeSelector;
