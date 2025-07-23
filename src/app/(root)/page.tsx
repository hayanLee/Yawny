import Policy from './_components/Policy';
import Products from './_components/Product/Products';
import Slider from './_components/Slider';
import SubSlider from './_components/SubSlider';

export default function HomePage() {
  return (
    <>
      <Slider />
      <main className='lg:max-w-[90%] px-4 mx-auto pb-[100px]'>
        <section className='py-4'>
          <h4 className='text-xl font-bold py-4'>All Products</h4>
          <Products />
        </section>
        <SubSlider slidesPerView={4} />
        <Policy />
      </main>
    </>
  );
}
