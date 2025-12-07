import express, { Request, Response } from 'express'
import config from './config'
import initDB from './database/db';



const app = express()
const port = config.port;

//parser
app.use(express.json());

initDB();

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
