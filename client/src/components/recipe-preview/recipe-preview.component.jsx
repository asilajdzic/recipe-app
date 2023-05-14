import { useGetUserID } from '../../hooks/useGetUserID';
import axios from 'axios';

import './recipe-preview.styles.scss';

const RecipePreview = ({ recipe, savedRecipes, setSavedRecipes }) => {
	const { _id, name, instructions, imageUrl, cookingTime } = recipe;
	const userID = useGetUserID();

	const saveRecipe = async () => {
		try {
			const response = await axios.put('http://localhost:3001/recipes', {
				recipeID: _id,
				userID,
			});
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.log(err);
		}
	};

	const isRecipeSaved = () => savedRecipes && savedRecipes.includes(_id);

	return (
		<div className='recipe-preview-container'>
			<div className='recipe-preview-header'>
				<h3>{name}</h3>
				{isRecipeSaved() ? (
					<h1 className='bookmark-icon'>&#9733;</h1>
				) : (
					<h1 onClick={saveRecipe} className='bookmark-icon'>
						&#9734;
					</h1>
				)}
			</div>
			<div className='recipe-preview-body'>
				<img src={imageUrl} alt="couldn't load resource"></img>
				<div className='instructions-container'>
					<p>{instructions}</p>
					<p>Cooking time: {cookingTime} minutes</p>
				</div>
			</div>
		</div>
	);
};

export default RecipePreview;
