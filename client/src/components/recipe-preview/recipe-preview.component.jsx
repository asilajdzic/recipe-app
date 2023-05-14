import './recipe-preview.styles.scss';

const RecipePreview = ({ recipe }) => {
	const { name, ingredients, instructions, imageUrl, cookingTime } = recipe;
	return (
		<div className='recipe-preview-container'>
			<div className='recipe-preview-header'>
				<h3>{name}</h3>
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
