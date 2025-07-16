import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import auth from './routes/auth.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/auth', auth);

app.get('/', (req, res) => {
  res.send('🚀 API is running!');
});

export default app;
