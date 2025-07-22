const Breadcrumb = ({ category, brand }: { category: string; brand: string }) => {
  return (
    <section className='hidden md:flex justify-center items-center md:p-5 text-gray-500 font-semibold'>
      <p className=''>{category}</p>
      <p className=' mx-2'>{'>'}</p>
      <p className=''>{brand}</p>
    </section>
  );
};

export default Breadcrumb;
