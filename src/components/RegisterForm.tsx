import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post('/user/register', data);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required', minLength: 6 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          {...register('phone', { required: 'Phone is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          {...register('address', { required: 'Address is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            {...register('pincode', { required: 'Pincode is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          {...register('state', { required: 'State is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Register
      </button>
    </form>
  );
}