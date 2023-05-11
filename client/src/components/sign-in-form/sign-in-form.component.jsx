import { useState } from 'react';

import axios from 'axios';

import './sign-in-form.styles.scss';

const defaultFormFields = {
	username: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { username, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();

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
					id='username'
					value={username}
				></input>
				<label htmlFor='password'>Password: </label>
				<input
					onChange={onChangeInput}
					className='input-field'
					name='password'
					type='password'
					id='password'
					value={password}
				></input>
				<button className='form-submit-btn'>Sign In</button>
			</form>
		</div>
	);
};

export default SignInForm;
