import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import auth from './routes/auth.js';
import protectedRoutes from './routes/protectedRoutes.js'; 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/auth', auth);
app.use('/api/v1', protectedRoutes); 

app.get('/', (req, res) => {
  res.send('🚀 API is running!');
});

export default app;
