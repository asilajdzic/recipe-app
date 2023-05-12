import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './sign-in-form.styles.scss';

const defaultFormFields = {
	username: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { username, password } = formFields;
	// eslint-disable-next-line
	const [cookies, setCookies] = useCookies(['access_token']);

	const navigate = useNavigate();

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3001/auth/sign-in', {
				username,
				password,
			});
			setCookies('access_token', response.data.token);
			window.localStorage.setItem('userID', response.data.userID);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
		resetFormFields();
	};
	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className='sign-in-form-container'>
			<form onSubmit={onSubmitForm} className='form-container'>
				<h2>Sign In</h2>
				<label htmlFor='username'>Username: </label>
				<input
					onChange={onChangeInput}
					className='input-field'
					name='username'
					type='text'
					value={username}
				></input>
				<label htmlFor='password'>Password: </label>
				<input
					onChange={onChangeInput}
					className='input-field'
					name='password'
					type='password'
					value={password}
				></input>
				<button className='form-submit-btn'>Sign In</button>
			</form>
		</div>
	);
};

export default SignInForm;
