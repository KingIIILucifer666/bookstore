import { FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../utils/http';
import { useAuth } from '../context/authContext';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { isLoggedIn, setIsLoggedIn, setAuthUser } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      router('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Fill all fields');
    }

    const user = { email, password, name };

    try {
      const response = await http.post('/auth/register', user);
      const token: string = response.data.token;
      const userData = response.data.user;

      setAuthUser({ ...userData, token });
      setIsLoggedIn(true);

      localStorage.setItem('authUser', JSON.stringify({ ...userData, token }));
    } catch (error) {
      error;
    }
  };

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
        className="flex flex-col justify-center items-center gap-6 bg-black w-[400px] h-[400px] rounded-lg"
      >
        <h1 className="text-2xl text-white italic font-bold">Register</h1>
        <input
          className="border-b py-2 w-[75%] px-4"
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border-b py-2 w-[75%] px-4"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-b py-2 w-[75%] px-4"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-white w-[50%] py-2 px-4 text-xl">
          Submit
        </button>
        <Link to="/login" className="text-white">
          Already have an account? Log In.
        </Link>
      </form>
    </div>
  );
};

export default Register;
