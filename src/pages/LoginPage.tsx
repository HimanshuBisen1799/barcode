import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import RegisterForm from '../components/RegisterForm';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { register, handleSubmit } = useForm<LoginForm>();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {!showRegister ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  {...register('password')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setShowRegister(true)}
              className="w-full mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <RegisterForm />
            <button
              onClick={() => setShowRegister(false)}
              className="w-full mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;