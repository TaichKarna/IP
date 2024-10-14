import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { PASSWORD_REQUIREMENTS } from './utils/regex';
import { userSchema } from './utils/validationSchedma';
import style from './App.module.css';
import { ReactTSParticles } from './components/ReactTSParticles';
import { resolveAfterPromise } from './utils/MockPromise';

// Your initial data and validation schema stay the same
const INITIAL_DATA = {
  email: '',
  age: '',
  new_password: '',
  confirm_password: '',
};

export default function App() {
  const [submittedUser, setSubmittedUser] = useState('');
  const [openNewPassword, setOpenNewPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [requirements, setRequirements] = useState(PASSWORD_REQUIREMENTS);
  const [isLoading, setIsLoading] = useState(false);

  function generatePassword(length = 12) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let password = '';
  
    // Ensure at least 1 uppercase letter
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
  
    // Ensure at least 4 numbers
    for (let i = 0; i < 4; i++) {
      password += numbers[Math.floor(Math.random() * numbers.length)];
    }
  
    // Ensure at least 1 symbol
    password += symbols[Math.floor(Math.random() * symbols.length)];
  
    // Fill the rest of the password with random lowercase letters and any other characters
    const allChars = uppercase + lowercase + numbers + symbols;
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    // Shuffle the password to mix the characters
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
  
  

  const formik = useFormik({
    initialValues: INITIAL_DATA,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSubmittedUser(values);
      }, 5000);
    },
  });

  const { getFieldProps, setFieldValue, handleSubmit, values, errors, touched } = formik;

  useEffect(() => {
    setRequirements(
      PASSWORD_REQUIREMENTS.map((req) => ({
        ...req,
        met: req.regex.test(values.new_password),
      }))
    );
  }, [values.new_password]);

  const height =
    !submittedUser && isLoading ? '400px' : submittedUser ? '400px' : '630px';

  return (
    <>
      <div className={style.container} style={{ height }}>
        {isLoading && (
          <div className={style.loader_wrapper}>
            <span className={style.loader}>Submitting</span>
          </div>
        )}
        {submittedUser && !isLoading && (
          <div className={style.user_info_wrapper}>
            <h2>Submitted User Info</h2>
            <p>Email: {submittedUser.email}</p>
            <p>Age: {submittedUser.age}</p>
            <p>New Password: {submittedUser.new_password}</p>
            <p>Confimation Password: {submittedUser.confirm_password}</p>
          </div>
        )}
        {!isLoading && !submittedUser && (
          <form onSubmit={handleSubmit} className={style.wrapper}>
            <h2>Form Validation</h2>
            <div className={style.input_wrapper}>
              <input
                {...getFieldProps('email')}
                placeholder="email"
                name="email"
                className={style.input_field}
              />
              <label htmlFor="email" className={style.input_label}>
                Email
              </label>
              <p className={style.error_text}>
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div className={style.input_wrapper}>
              <input
                {...getFieldProps('age')}
                className={style.input_field}
                placeholder="age"
                name="age"
              />
              <label htmlFor="age" className={style.input_label}>
                Age
              </label>
              <p className={style.error_text}>
                {errors.age && touched.age && errors.age}
              </p>
            </div>
            <div className={style.input_wrapper}>
              <input
                {...getFieldProps('new_password')}
                type={openNewPassword ? 'text' : 'password'}
                className={style.input_field}
                placeholder="New password"
                name="new_password"
              />
              <label htmlFor="new_password" className={style.input_label}>
                New password
              </label>
              {!openNewPassword ? (
                <svg
                  className={style.input_icon}
                  onClick={() => setOpenNewPassword(!openNewPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className={style.input_icon}
                  onClick={() => setOpenNewPassword(!openNewPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}

            </div>
            <button
                type="button"
                className={style.submit_btn}
                onClick={() => setFieldValue('new_password', generatePassword())}
              >
                Generate Password
              </button>
            <ul className={style.password_requirement}>
              {requirements.map((req) => (
                <li
                  key={req.id}
                  className={`${req.met && style.requirement_met}`}
                >
                  {req.text}
                </li>
              ))}
            </ul>
            <div className={style.input_wrapper}>
              <input
                type={openConfirmPassword ? 'text' : 'password'}
                {...getFieldProps('confirm_password')}
                className={style.input_field}
                placeholder="Confirm Password"
                name="confirm_password"
              />
              <label htmlFor="confirm_password" className={style.input_label}>
                Confirm password
              </label>
              {!openConfirmPassword ? (
                <svg
                  className={style.input_icon}
                  onClick={() => setOpenConfirmPassword(!openConfirmPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className={style.input_icon}
                  onClick={() => setOpenConfirmPassword(!openConfirmPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              <p className={style.error_text}>
                {errors.confirm_password && touched.confirm_password && errors.confirm_password}
              </p>
            </div>
            <button className={style.submit_btn} type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
      <ReactTSParticles />
    </>
  );
}
