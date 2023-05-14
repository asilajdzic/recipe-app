import { useState, useEffect, Fragment } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import axios from 'axios';

import RecipePreview from '../../components/recipe-preview/recipe-preview.component';

import './home.styles.scss';

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserID();

	const isRecipeSaved = (recipeID) => {
		if (!userID || typeof userID !== 'string') {
			return false;
		}
		return savedRecipes && savedRecipes.includes(recipeID);
	};

	const removeSavedRecipe = async (recipeID) => {
		try {
			const response = await axios.delete(
				`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`
			);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.log(err);
		}
	};

	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put('http://localhost:3001/recipes', {
				recipeID: recipeID,
				userID,
			});
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get('http://localhost:3001/recipes');
				setRecipes(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		const fetchSavedRecipes = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/recipes/savedRecipes/ids/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (error) {
				console.error(error);
			}
		};
		fetchRecipes();
		if (userID) fetchSavedRecipes();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='home-container'>
			<h2>Recipes</h2>
			{recipes.map((recipe) => (
				<Fragment key={recipe._id}>
					<div className='bookmark-recipe-container'>
						{isRecipeSaved(recipe._id) ? (
							<h1
								onClick={() => removeSavedRecipe(recipe._id)}
								className='bookmark-icon'
								title='Remove from saved recipes'
							>
								&#9733;
							</h1>
						) : (
							<h1
								onClick={() => saveRecipe(recipe._id)}
								className='bookmark-icon'
								title='Add to saved recipes'
							>
								&#9734;
							</h1>
						)}
					</div>

					<RecipePreview recipe={recipe} />
				</Fragment>
			))}
		</div>
	);
};

export default Home;
