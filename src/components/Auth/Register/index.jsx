import React, { useState } from 'react';
import { register as registerApi } from '@api/auth';
import { useDispatch } from 'react-redux';
import { login } from '@app/slices/auth';
import toast from '@utils/toast';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@utils/localStorage';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    name: '',
    referral: '',
  });

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!userInput.username || !userInput.password || !userInput.name) {
        return;
      }

      const { data } = await registerApi({ ...userInput, role: 'admin' });
      setToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      dispatch(
        login({
          ...data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      navigate('/');
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };

  return (
    <>
      <div className="auth-input-control">
        <div className="auth-input-label">Username:</div>
        <input
          type="text"
          required={true}
          name="username"
          value={userInput.username}
          onChange={handleChange}
        />
      </div>
      <div className="auth-input-control">
        <div className="auth-input-label">Password:</div>
        <input
          type="password"
          required={true}
          name="password"
          value={userInput.password}
          onChange={handleChange}
        />
      </div>
      <div className="auth-input-control">
        <div className="auth-input-label">Name:</div>
        <input
          type="text"
          required={true}
          name="name"
          value={userInput.name}
          onChange={handleChange}
        />
      </div>
      <div className="auth-input-control">
        <div className="auth-input-label">Referral:</div>
        <input
          type="text"
          required={true}
          name="referral"
          value={userInput.referral}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </>
  );
}
