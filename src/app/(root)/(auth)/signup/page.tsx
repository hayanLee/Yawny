import SignupForm from './_components/SignupForm';

const SignupPage = () => {
  return (
    <div className='grow p-4 flex flex-col justify-between'>
      <h5 className='text-2xl font-bold text-center py-4'>회원가입</h5>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
