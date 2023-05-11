import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import SavedRecipes from './routes/saved-recipes/saved-recipes.component';
import CreateRecipe from './routes/create-recipe/create-recipe.component';
import Navigation from './components/navigation/navigation.component';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navigation />
				<Routes>
					<Route index element={<Home />} />
					<Route path='/auth' element={<Authentication />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/saved-recipes' element={<SavedRecipes />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
