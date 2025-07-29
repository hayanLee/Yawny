import SubSlider from '../../_components/SubSlider';
import LoginForm from './_components/LoginForm';

const LoginPage = () => {
  return (
    <div className='grow p-4 flex flex-col justify-between'>
      <h5 className='text-2xl font-bold text-center py-4'>Yawny에 오신 것을 환영해요!</h5>
      <LoginForm />
      <SubSlider />
    </div>
  );
};

export default LoginPage;
