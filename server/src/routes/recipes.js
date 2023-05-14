import express from 'express';
import mongoose from 'mongoose';
import { RecipesModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const result = await RecipesModel.find({});
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', verifyToken, async (req, res) => {
	const recipe = new RecipesModel({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		image: req.body.image,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		imageUrl: req.body.imageUrl,
		cookingTime: req.body.cookingTime,
		userOwner: req.body.userOwner,
	});
	console.log(recipe);

	try {
		const result = await recipe.save();
		res.status(201).json({
			createdRecipe: {
				name: result.name,
				image: result.image,
				ingredients: result.ingredients,
				instructions: result.instructions,
				_id: result._id,
			},
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:recipeId', async (req, res) => {
	try {
		const result = await RecipesModel.findById(req.params.recipeId);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/', async (req, res) => {
	try {
		const recipe = await RecipesModel.findById(req.body.recipeID);
		const user = await UserModel.findById(req.body.userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!user.savedRecipes) {
			user.savedRecipes = [];
		}

		user.savedRecipes.push(recipe);
		await user.save();
		res.status(201).json({ savedRecipes: user.savedRecipes });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/savedRecipes/ids/:userId', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId);
		res.status(201).json({ savedRecipes: user?.savedRecipes });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/savedRecipes/:userId', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId);
		const savedRecipes = await RecipesModel.find({
			_id: { $in: user.savedRecipes },
		});

		console.log(savedRecipes);
		res.status(201).json({ savedRecipes });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.delete('/savedRecipes/:userId/:recipeId', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId);
		const index = user.savedRecipes.indexOf(req.params.recipeId);
		if (index === -1) {
			return res.status(404).json({ message: 'Recipe not found' });
		}
		user.savedRecipes.splice(index, 1);
		await user.save();
		res.status(200).json({ savedRecipes: user.savedRecipes });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

export { router as recipesRouter };
