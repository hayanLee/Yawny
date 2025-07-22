import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SizeSelector = ({ sizes }: { sizes: string[] }) => {
  return (
    <Select>
      <SelectTrigger size='lg'>
        <SelectValue placeholder='size' />
      </SelectTrigger>
      <SelectContent>
        {sizes.map((size) => (
          <SelectItem key={size} value={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SizeSelector;
