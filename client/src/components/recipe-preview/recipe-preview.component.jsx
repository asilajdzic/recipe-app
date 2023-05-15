import { useState } from 'react';

import './recipe-preview.styles.scss';

const RecipePreview = ({ recipe }) => {
	const { name, ingredients, instructions, imageUrl, cookingTime } = recipe;
	const [showIngredients, setShowIngredients] = useState(false);

	const onClickHandler = () => {
		setShowIngredients(!showIngredients);
	};

	return (
		<div
			className='recipe-preview-container'
			title='Click to show/hide Ingredients'
			onClick={onClickHandler}
		>
			<h3 className='recipe-name'>{name}</h3>
			<div className='recipe-preview-body'>
				<img src={imageUrl} alt="couldn't load resource"></img>
				{showIngredients && (
					<ul className='ingredients-container'>
						<h3>Ingredients</h3>
						{ingredients.map((ingredient, index) => (
							<li key={index} className='list-item'>
								{ingredient}
							</li>
						))}
					</ul>
				)}
				<div className='instructions-container'>
					<p>{instructions}</p>
					<p>Cooking time: {cookingTime} minutes</p>
				</div>
			</div>
		</div>
	);
};

export default RecipePreview;
