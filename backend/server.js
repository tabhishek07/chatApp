import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';

const port  = process.env.PORT || 4000


const server =  http.createServer(app);

app.listen(port , () => {
    console.log(`Server is running at port ${port}`)
})