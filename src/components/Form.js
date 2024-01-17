import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiExclamationCircle } from "react-icons/hi2";
import UserContext from './UserContext'

const Form = () => {
  const [inputFields, setInputFields] = useState({
      username: '',
      password: ''
  })
  const [errors, setErrors] = useState({});
  const [errorsVisibility, setErrorsVisibility] = useState(false);
  let navigate = useNavigate();
  const { fetchData } = useContext(UserContext);

  const validateValues = (inputValues) => {
      let errors = {};
      const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!inputValues.username) {
      errors.username = "Username is required";
      } else errors.username = "";
      if (!inputValues.password.length) {
      errors.password = "Password is required";
      }
      else if (!passwordPattern.test(inputValues.password)) {
      errors.password = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.";
      } else errors.password = "";
      return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    setErrors(validateValues(inputFields));
  }

  const navigateTable = async () => {
    if(errors.username === '' && errors.password === '' && inputFields.username !== '' && inputFields.password !== ''){
      navigate('/table')
      try {
        await fetchData()
      } catch(err) {
        console.error(err)
      }
    } 
  }

  const handleErrors = () => {
    setErrors(validateValues(inputFields));
    setErrorsVisibility(true)
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      handleErrors()
      await navigateTable()
      }
    
  return (
    <form onSubmit={handleSubmit}>
        <input type='name' name='username' value={inputFields.username} placeholder='username' onChange={handleChange}/>
        {
        <div className={(errors.username && errorsVisibility) ? 'error-details visible' : 'error-details'}>
            <span><HiExclamationCircle/></span>
            <p>{errors.username}</p>
        </div>
        }
        <input type='password' name='password' value={inputFields.password} placeholder='password' onChange={handleChange}/>
        {
        <div className={(errors.password && errorsVisibility) ? 'error-details visible' : 'error-details'}>
            <span><HiExclamationCircle/></span>
            <p>{errors.password}</p>
        </div>
        }
        <button type='submit'>Login</button>

    </form>
  )
}

export default Form