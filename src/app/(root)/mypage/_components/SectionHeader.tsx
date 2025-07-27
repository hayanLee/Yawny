const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className='flex border-b-3 mb-3'>
      <h4 className='text-xl font-bold pb-2.5'>{title}</h4>
    </div>
  );
};

export default SectionHeader;
