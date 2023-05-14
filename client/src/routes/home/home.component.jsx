import { useState, useEffect } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import axios from 'axios';

import RecipePreview from '../../components/recipe-preview/recipe-preview.component';

import './home.styles.scss';

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserID();

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
		fetchSavedRecipes();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='home-container'>
			<h2>Recipes</h2>
			{recipes.map((recipe) => (
				<RecipePreview
					key={recipe._id}
					recipe={recipe}
					savedRecipes={savedRecipes}
					setSavedRecipes={setSavedRecipes}
				/>
			))}
		</div>
	);
};

export default Home;
