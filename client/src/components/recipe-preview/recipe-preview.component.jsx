import './recipe-preview.styles.scss';

const RecipePreview = ({ recipe, savedRecipes, setSavedRecipes }) => {
	const { name, instructions, imageUrl, cookingTime } = recipe;

	return (
		<div className='recipe-preview-container'>
			<h3 className='recipe-name'>{name}</h3>
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
