import express from 'express';
import 'express-async-errors';
import { bookRouter } from './routes/Book';

const app = express();
app.use(express.json());

app.use('/api/v1/bookshop', bookRouter);


export { app };
