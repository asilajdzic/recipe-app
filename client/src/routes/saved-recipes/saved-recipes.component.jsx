import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';

import RecipePreview from '../../components/recipe-preview/recipe-preview.component';

import './saved-recipes.styles.scss';

const SavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserID();

	useEffect(() => {
		const fetchSavedRecipes = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/recipes/savedRecipes/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSavedRecipes();
	}, [userID]);

	const removeSavedRecipe = async (recipeID) => {
		try {
			await axios.delete(
				`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`
			);
			setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== recipeID));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='saved-recipes-container'>
			<h2>Saved Recipes</h2>
			{savedRecipes.map((recipe) => (
				<Fragment key={recipe._id}>
					<div className='bookmark-recipe-container'>
						<h1
							onClick={() => removeSavedRecipe(recipe._id)}
							className='bookmark-icon'
							title='Remove from saved recipes'
						>
							&#9733;
						</h1>
					</div>
					<RecipePreview recipe={recipe} />
				</Fragment>
			))}
		</div>
	);
};

export default SavedRecipes;
