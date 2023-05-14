import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './sign-up-form.styles.scss';

const defaultFormFields = {
	username: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { username, password, confirmPassword } = formFields;
	const navigate = useNavigate();
	// eslint-disable-next-line
	const [cookies, setCookies] = useCookies(['access_token']);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			console.log('Passwords do not match!');
		}

		try {
			await axios.post('http://localhost:3001/auth/sign-up', {
				username,
				password,
			});
			try {
				const response = await axios.post(
					'http://localhost:3001/auth/sign-in',
					{
						username,
						password,
					}
				);
				setCookies('access_token', response.data.token);
				window.localStorage.setItem('userID', response.data.userID);
				navigate('/');
			} catch (error) {
				console.log(error);
			}
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
		<div className='sign-up-form-container'>
			<form onSubmit={onSubmitForm} className='form-container'>
				<h2>Sign Up</h2>
				<label>Username: </label>
				<input
					onChange={onChangeInput}
					className='input-field'
					name='username'
					type='text'
					value={username}
				></input>
				<label>Password: </label>
				<input
					onChange={onChangeInput}
					className='input-field'
					name='password'
					type='password'
					value={password}
				></input>
				<label>Confirm Password: </label>
				<input
					onChange={onChangeInput}
					className='input-field'
					name='confirmPassword'
					type='password'
					value={confirmPassword}
				></input>
				<button className='form-submit-btn'>Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpForm;
