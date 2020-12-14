// Imports
import express from 'express';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import UserRoutes from './routes/user-routes' ;
import DeckRoutes from './routes/decks-routes';

// Config vars 
const port: number = 5000;
const mongo_url: string = process.env.MONGO || 'mongodb://localhost:27017/flash-learn';

// Server congif
const app = express();
app.use(json());
app.use(UserRoutes);
app.use(DeckRoutes);

// Mongo connect
mongoose.connect(mongo_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, ()=> {console.log('Database connected');
})

app.get('/', (req, res) => {
    res.send("I'm working");
});

const server = app.listen(port, ()=> {
    console.log(`Server started at port: ${port}`);
})

export = server;
