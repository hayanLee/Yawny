import Policy from './_components/Policy';
import Products from './_components/Product/Products';
import Slider from './_components/Slider';

export default function HomePage() {
  return (
    <>
      <Slider />
      <main className='lg:max-w-[90%] px-4 mx-auto pb-[100px]'>
        {/* <SubSlider /> */}
        <section className='py-4'>
          <Products />
        </section>
        <Policy />
      </main>
    </>
  );
}
