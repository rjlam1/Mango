
import React, { useContext, useState } from 'react';
import { AuthContext } from '../PrivateRouter/AuthPrivate';
import { useNavigate, useLocation, Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { ThemeContext } from './Theme';

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { signIn, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setIsLoading(true);
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-white"
    >
      <div className="w-full max-w-md">
        <motion.div 
          whileHover={{ y: -5 }}
          className="overflow-hidden bg-white border border-green-100 shadow-2xl rounded-xl"
        >
          <div className="p-6 text-center bg-gradient-to-r from-green-500 to-emerald-600">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-1 text-green-100">Track your mango plants with care</p>
          </div>

          <div className="p-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 mb-6 text-red-600 border border-red-100 rounded-lg bg-red-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="w-5 h-5 text-green-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-5 h-5 text-green-500" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? (
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogle}
                disabled={isLoading}
                className="flex items-center justify-center w-full px-4 py-3 mt-6 font-medium text-gray-700 transition-all border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
                Sign in with Google
              </motion.button>
            </div>
          </div>

          <div className="px-8 py-6 text-center border-t border-gray-200 bg-gray-50">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-600 transition-colors hover:text-green-500">
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;