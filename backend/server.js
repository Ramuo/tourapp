import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import userRouter from './routes/userRoutes.js';

dotenv.config();

// Connect the database
connectDB();

const PORT = process.env.PORT || 5000;

// Initialize de express app
const app = express();

//Initialize body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
app.get('/', (req, res) => {
    res.status(200).json({message: ` Welcome to the tour-app API`})
});

app.use('/api/users', userRouter);


//ERROR MIDDLEWARE HANDLER
app.use(notFound);
app.use(errorHandler)


//SERVER
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));