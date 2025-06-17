import { FormEvent, useState, useEffect } from 'react';
import http from '../utils/http';
import { UserLoginData } from '../utils/types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let user = { email, password };
    try {
      const response = await http.post('/auth/login', user);
      const token: string = response.data.token;
      const userData: UserLoginData = response.data.user;
      setAuthUser({ ...userData, token });
      setIsLoggedIn(true);
      localStorage.setItem('authUser', JSON.stringify({ ...userData, token }));
      console.log('Login Successfull: ', response.data);
    } catch (error) {
      console.log('Login Error', error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      router('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div
      style={{
        background:
          'radial-gradient(circle,rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)',
      }}
      className="h-[calc(100vh-56px)] flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-6 bg-black w-[400px] h-[300px] rounded-lg"
      >
        <h1 className="text-2xl text-white italic font-bold">Login</h1>
        <input
          className="border-b py-2 w-[75%] px-4"
          type="email"
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-b py-2 w-[75%] px-4"
          type="password"
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-white w-[50%] py-2 px-4 text-xl">
          Submit
        </button>
        <Link to="/register" className="text-white">
          Don't have an account? Register.
        </Link>
      </form>
    </div>
  );
};

export default Login;
