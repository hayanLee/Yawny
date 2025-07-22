import Policy from './_components/Policy';
import Products from './_components/Product/Products';
import Slider from './_components/Slider';

export default function HomePage() {
  return (
    <>
      <main className='space-y-4'>
        <Slider />
        <Products />
      </main>
      <Policy />
    </>
  );
}
