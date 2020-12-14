// Imports
import {Router, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';
import dotenv from 'dotenv'

//Config
const router = Router();
const salt: number = 10;


// Routes
router.post('/register', async (req: Request, res: Response, next) => {
    const username = await userModel.findOne({username: req.body.username});
    let errors = [];

    if(username) {
        errors.push('Username already found');
    }
    
    if (!req.body.email){
        errors.push('No email');
    }

    if (req.body.password.length < 6) {
        errors.push('Password has to be atleast 6 characters');
    }

    if(errors.length == 0){
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
    
        if(process.env.NODE_ENV != 'test'){
            try {
                user.save();
            } catch (error) {
                res.send(error);
            }
        }

     res.send(user);
    }else {
        res.status(401).send({errors});
    }  
})

// Export
export = router;