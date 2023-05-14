import { useState, useEffect } from 'react';
import axios from 'axios';

import RecipePreview from '../../components/recipe-preview/recipe-preview.component';

import './home.styles.scss';

const Home = () => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get('http://localhost:3001/recipes');
				setRecipes(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchRecipes();
	}, []);

	return (
		<div className='home-container'>
			<h2>Recipes</h2>
			{recipes.map((recipe) => (
				<RecipePreview key={recipe._id} recipe={recipe} />
			))}
		</div>
	);
};

export default Home;
