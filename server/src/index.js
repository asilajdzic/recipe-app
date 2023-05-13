import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

const options = {
	writeConcern: { w: 'majority', wtimeout: 1000 },
	useUnifiedTopology: true,
	useNewUrlParser: true,
};
mongoose
	.connect(process.env.MONGO_URL, options)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((error) => {
		console.log('Error connecting to database', error);
	});

app.listen(3001, () => console.log('Server started!'));
