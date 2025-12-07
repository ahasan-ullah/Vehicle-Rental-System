import express, { Request, Response } from 'express'
import config from './config'
import initDB from './database/db';
import logger from './middleware/logger';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';

const app = express()

//parser
app.use(express.json());

//initializing db
initDB();


//root routes
app.get('/', logger, (req:Request, res:Response) => {
  res.send('Hello World!')
})

//authentication
app.use('/api/v1/auth',authRoutes);

//user routes
app.use('/api/v1/users',userRoutes);


export default app;