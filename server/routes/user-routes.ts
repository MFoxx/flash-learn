// Imports
import {Router, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';

//Config
const router = Router();
const salt: number = 10;

// Routes
router.post('/register', async (req: Request, res: Response) => {
    const username = await userModel.findOne({username: req.body.username});

    if(username) {
        res.send('This username is taken!')
    }
    
    if (!req.body.email || typeof(req.body.email) != 'string' ){
        res.send('No email detected');
    }

    if (!req.body.password ) {
        res.send('No password');
    }

    if (req.body.password.length < 6) {
        res.send('Password has to be atleast 6 characters');
    }

    // Hash pass
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: password,
        log: [{
            date: new Date,
            event: 'User registrated'
        }]
    })

    try {
        user.save();
    } catch (error) {
        res.send(error);
    }

    res.send(user);
})

// Export
export = router;