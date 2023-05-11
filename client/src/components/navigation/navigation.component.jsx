import { Link } from 'react-router-dom';

import './navigation.styles.scss';

const Navigation = () => {
	return (
		<div className='nav-bar'>
			<Link to='/' className='nav-link'>
				Home
			</Link>
			<Link to='/create-recipe' className='nav-link'>
				Create Recipe
			</Link>
			<Link to='/saved-recipes' className='nav-link'>
				Saved Recipes
			</Link>
			<Link to='/auth' className='nav-link'>
				Sign In
			</Link>
		</div>
	);
};

export default Navigation;
