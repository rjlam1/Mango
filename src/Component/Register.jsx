// // src/pages/Register.jsx
// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../PrivateRouter/AuthPrivate';
// import { useNavigate } from 'react-router';

// const Register = () => {
//   const { createUser, updateUserProfile } = useContext(AuthContext);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const photo = e.target.photo.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
//       return setError("Password must be at least 6 characters with both uppercase and lowercase letters.");
//     }

//     try {
//       const res = await createUser(email, password);
//       await updateUserProfile(name, photo);
//       navigate('/');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input name="name" placeholder="Name" required />
//         <input name="photo" placeholder="Photo URL" required />
//         <input name="email" placeholder="Email" required />
//         <input name="password" type="password" placeholder="Password" required />
//         <button type="submit">Register</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Register;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../PrivateRouter/AuthPrivate';
import { useNavigate } from 'react-router';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setError(
        'Password must be at least 6 characters long and contain both uppercase and lowercase letters.'
      );
      return;
    }

    try {
      const res = await createUser(email, password);
      await updateUserProfile(name, photo);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md p-5 mx-auto mt-10 border rounded shadow">
      <h2 className="mb-5 text-2xl">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input name="name" placeholder="Name" required className="p-2 border rounded" />
        <input name="photo" placeholder="Photo URL" required className="p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" required className="p-2 border rounded" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 text-white bg-green-600 rounded">Register</button>
      </form>
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
};

export default Register;
