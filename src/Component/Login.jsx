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

  const containerBg = theme === 'dark' ? 'from-gray-800 to-gray-900' : 'from-green-50 to-white';
  const cardBg = theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100';
  const headerBg = theme === 'dark' ? 'from-gray-700 to-gray-800' : 'from-green-500 to-emerald-600';
  const inputBg = theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400';
  const footerBg = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-600';
  const linkColor = theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-green-600 hover:text-green-500';

  return (
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center p-4 bg-gradient-to-br ${containerBg}`}
    >
      <div className="w-full max-w-md">
        <title>Mango Grove Tracker | Login</title>
        <motion.div 
          whileHover={{ y: -5 }}
          className={`overflow-hidden border shadow-2xl rounded-xl ${cardBg}`}
        >
          <div className={`p-6 text-center bg-gradient-to-r ${headerBg}`}>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-1 text-green-100">Track your mango plants with care</p>
          </div>

          <div className="p-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 mb-6 text-red-400 border border-red-800 rounded-lg bg-red-900/20"
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
                  className={`w-full py-3 pl-10 pr-4 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${inputBg}`}
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
                  className={`w-full py-3 pl-10 pr-4 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${inputBg}`}
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
                  <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${textColor} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>Or continue with</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogle}
                disabled={isLoading}
                className={`flex items-center justify-center w-full px-4 py-3 mt-6 font-medium transition-all border rounded-lg shadow-sm ${theme === 'dark' ? 'text-gray-200 border-gray-600 hover:bg-gray-700' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
                Sign in with Google
              </motion.button>
            </div>
          </div>
          <div className={`px-8 py-6 text-center border-t ${footerBg}`}>
            <p className={textColor}>
              Don't have an account?{' '}
              <Link to="/register" className={`font-medium transition-colors ${linkColor}`}>
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