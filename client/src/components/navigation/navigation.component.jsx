import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './navigation.styles.scss';

const Navigation = () => {
	const [cookies, setCookies] = useCookies(['access_token']);
	const navigate = useNavigate();

	const signOut = () => {
		setCookies('access_token', '');
		window.localStorage.removeItem('userID');
		navigate('/');
	};

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
			{!cookies.access_token ? (
				<Link to='/auth' className='nav-link'>
					Sign In
				</Link>
			) : (
				<button className='sign-out-btn nav-link' onClick={signOut}>
					Sign Out
				</button>
			)}
		</div>
	);
};

export default Navigation;
