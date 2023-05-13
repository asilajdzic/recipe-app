import { useState } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import './create-recipe.styles.scss';

const defaultFormFields = {
	name: '',
	ingredients: [''],
	instructions: '',
	imageUrl: '',
	cookingTime: 0,
	userOwner: null,
};

const CreateRecipe = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { name, ingredients, instructions, imageUrl, cookingTime } = formFields;
	const [cookies] = useCookies(['access_token']);
	const userID = useGetUserID();
	const navigate = useNavigate();

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleAddIngredient = () => {
		const newIngredients = [...ingredients, ''];
		setFormFields({ ...formFields, ingredients: newIngredients });
	};

	const handleIngredientChange = (event, index) => {
		const { value } = event.target;
		const newIngredients = [...ingredients];
		newIngredients[index] = value;
		setFormFields({ ...formFields, ingredients: newIngredients });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (!userID) {
			console.log('You are not signed in!');
			return;
		}

		const updatedFormFields = { ...formFields, userOwner: userID };

		try {
			await axios.post('http://localhost:3001/recipes', updatedFormFields, {
				headers: { authorization: cookies.access_token },
			});
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='create-recipe-form-container'>
			<h2>Create Recipe</h2>
			<form onSubmit={handleFormSubmit} className='form-container'>
				<label>Name: </label>
				<input
					className='input-field'
					name='name'
					value={name}
					onChange={onChangeInput}
				></input>
				<label>Ingredients: </label>
				{ingredients.map((ingredient, index) => (
					<input
						key={index}
						type='text'
						name='ingredients'
						value={ingredient}
						className='input-field'
						onChange={(event) => handleIngredientChange(event, index)}
					/>
				))}
				<button
					type='button'
					onClick={handleAddIngredient}
					className='input-field'
				>
					Add Ingredient
				</button>

				<label>Instructions: </label>
				<textarea
					className='input-field text-input-field'
					name='instructions'
					value={instructions}
					onChange={onChangeInput}
				></textarea>
				<label>Image URL: </label>
				<input
					className='input-field'
					name='imageUrl'
					value={imageUrl}
					onChange={onChangeInput}
				></input>
				<label>Cooking Time: </label>
				<input
					className='input-field'
					name='cookingTime'
					value={cookingTime}
					onChange={onChangeInput}
				></input>
				<button type='submit' className='form-submit-btn'>
					Create Recipe
				</button>
			</form>
		</div>
	);
};

export default CreateRecipe;
