
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/mongodb.js';
import route from './routes/AuthRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
credentials:true,
}))
app.use('/api',route);

connectDB();

app.get('/', (req, res) => {
  res.json('Server Running ✅');
});


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
