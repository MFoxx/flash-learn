import express from 'express';

const app = express();
const port: number = 5000;

app.get('/', (req, res) => {
    res.send("I'm working");
});

app.listen(port, ()=> {
    console.log(`Server started at port: ${port}`);
})
