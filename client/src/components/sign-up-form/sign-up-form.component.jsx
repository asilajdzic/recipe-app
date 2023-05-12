import { useState } from 'react';

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
				<label htmlFor='confirmPassword'>Confirm Password: </label>
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
