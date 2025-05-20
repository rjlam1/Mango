import React, { useContext, useState } from 'react';
import { AuthContext } from '../PrivateRouter/AuthPrivate';
import { useNavigate, useLocation } from 'react-router';

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md p-5 mx-auto mt-10 border rounded shadow">
      <h2 className="mb-5 text-2xl">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input name="email" placeholder="Email" type="email" required className="p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="p-2 border rounded" />
        <button type="submit" className="p-2 text-white bg-green-600 rounded">Login</button>
      </form>
      <button
        onClick={handleGoogle}
        className="w-full p-2 mt-3 text-white bg-red-500 rounded"
      >
        Login with Google
      </button>
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
};

export default Login;
