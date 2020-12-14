// Imports 
import {Router, Request, Response} from 'express';
import userModel from '../models/userModel';
import Deck from '../interface/deck-interface';
import Card from '../interface/card-interface';

//Config
const router = Router();

// Get all decks by id of a user
router.get('/:username/deck/all/', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        // res.send('No document found;');
        res.status(404);
    }

    res.send(doc.decks);
})

// create deck in user object
router.post('/:username/deck/create', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});
    
    if (!doc) {
        res.status(404)
    }

    if (!req.body.name) {
        res.status(400);
    }

    const deck: Deck = {
        name: req.body.name,
        cards: []
    }

    if(process.env.NODE_ENV != 'test'){
        try {
            doc.decks.push(deck);
            doc.save();
        } catch (error) {
            res.send(error);
        }
    }
    res.send(doc);
})

// Delete deck by id from user
router.post('/:username/deck/:deckid/delete', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.status(404).end();
        return;
    }

    const foundIndex: number = doc.decks.findIndex((deck: Deck) => deck._id == req.params.deckid)    
    if (foundIndex !== -1) {
        doc.decks.splice(foundIndex);   
    }else {
        res.status(404).send('No deck with that id')
        return;
    }
    

    if(process.env.NODE_ENV != 'test'){
        try {
            doc.save();
        } catch (error) {
            res.send(error);
        }
    }    
    res.send(doc.decks)
})

// Update deck name by id from user
router.post('/:username/deck/:deckid/update', async(req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.status(404).send('No user found with that id    ');
        return;
    }

    const foundIndex: number = doc.decks.findIndex((deck: Deck) => deck._id == req.params.deckid)    
    if (foundIndex !== -1) {
        doc.decks[foundIndex].name = req.body.name;   
    }else {
        res.status(404).send('No deck with that id')
        return;
    }

    if(process.env.NODE_ENV != 'test'){
        try {
            doc.save();
        } catch (error) {
            res.send(error);
        }
    }   
    res.send(doc.decks)
})

// Create card in deck by id in user
router.post('/:username/deck/:deckid/card/create', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.status(404).send('No user with that id found');
        return;
    }

    if (!req.body.explanation || !req.body.question) {
        res.status(400).send('Please fill in all info');
        return;
    }

    // Card object
    const card: Card = {
        question: req.body.question,
        explanation: req.body.explanation,
    }


    const foundIndex: number = doc.decks.findIndex((deck: Deck) => deck._id == req.params.deckid)    
    if (foundIndex !== -1) {
        doc.decks[foundIndex].cards.push(card);   
    }else {
        res.status(404).send('No deck with that id')
        return;
    }

    if(process.env.NODE_ENV != 'test'){
        try {
            doc.save();
        } catch (error) {
            res.send(error);
        }
    } 
    res.send(doc.decks)

})

// Delete card from deck in user
router.post('/:username/deck/:deckid/card/delete/:cardid', async (req: Request, res: Response, next) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.status(404).send('No user found');
        return;
    }

    const deckIndex: number = doc.decks.findIndex((deck: Deck) => deck._id == req.params.deckid)    
    if (deckIndex == -1) {
        res.status(404).send('Deck with that id not found');
        return;
    }

    const cardIndex: number = doc.decks[deckIndex].cards.findIndex((card: Card) => card._id == req.params.cardid)    
    if (cardIndex == -1) {
        res.status(404).send('Card with that id not found');
        return;
    }

    doc.decks[deckIndex].cards.splice(cardIndex);

    if(process.env.NODE_ENV != 'test'){
        try {
            doc.save();
        } catch (error) {
            res.send(error);
        }
    }     
res.send(doc.decks);
})

// Edit card in deck in user
router.post('/:username/deck/:deckid/card/edit/:cardid', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.status(404).send('Could not find the user');
        return;
    }

    const deckIndex: number = doc.decks.findIndex((deck: Deck) => deck._id == req.params.deckid)    
    if (deckIndex == -1) {
        res.status(404).send('Deck with that id not found');
        return;
    }

    const cardIndex: number = doc.decks[deckIndex].cards.findIndex((card: Card) => card._id == req.params.cardid)    
    if (cardIndex == -1) {
        res.status(404).send('Card with that id not found');
        return;
    }

    if (!req.body.explanation || !req.body.question) {
        res.status(400).send('Please fill in all info');
        return;
    }

    doc.decks[deckIndex].cards[cardIndex].question = req.body.question;
    doc.decks[deckIndex].cards[cardIndex].explanation = req.body.explanation;

    if(process.env.NODE_ENV != 'test'){
        try {
            doc.save();
        } catch (error) {
            res.send(error);
        }
    }     
res.send(doc.decks);
})




// Export
export = router;