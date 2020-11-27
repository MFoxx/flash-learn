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
        res.send('No document found;');
    }

    res.send(doc.decks);
})

// create deck in user object
router.post('/:username/deck/create', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.send('No document found;');
    }

    if (!req.body.name) {
        res.send('There was no deck name');
    }

    const deck: Deck = {
        name: req.body.name,
        cards: []
    }

    doc.decks.push(deck);
    doc.save();
    res.send(doc);
})

// Delete deck by id from user
router.post('/:username/deck/:deckid/delete', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.send('No document found;');
    }

    let index: number = 0;
    doc.decks.forEach((deck: Deck) => {
        index++;
        if(deck._id == req.params.deckid) {
            console.log(index);
            console.log(deck);
            doc.decks.splice(index - 1);
        } else {
            res.send('There was no deck with that id');
        }
    })

    doc.save()
    res.send(doc.decks)
})

// Update deck name by id from user
router.post('/:username/deck/:deckid/update', async(req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.send('No document found;');
    }

    doc.decks.forEach((deck: Deck) => {
        if(deck._id == req.params.deckid) {
            deck.name = req.body.name
        }
    })

    doc.save()
    res.send(doc.decks)
})

// Create card in deck by id in user
router.post('/:username/deck/:deckid/card/create', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.send('No document found;');
    }

    if (!req.body.explanation || !req.body.question) {
        res.send('please fill in all info');
    }

    // Card object
    const card: Card = {
        question: req.body.question,
        explanation: req.body.explanation,
    }


    doc.decks.forEach((deck: Deck) => {
        if(deck._id == req.params.deckid) {
            deck.cards.push(card);
        }
    })

    doc.save();
    res.send(doc.decks)

})

// Delete card from deck in user
router.post('/:username/deck/:deckid/card/delete/:cardid', async (req: Request, res: Response, next) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.send('No document found;');
    }
    let index: number = 0;
    let deckIndex: number = -1;
    doc.decks.forEach((deck: Deck) => {
        deckIndex++;
        if(deck._id == req.params.deckid) {
            deck.cards.forEach((card: Card) => {
                index++
                if (card._id == req.params.cardid) {
                    doc.decks[deckIndex].cards.splice(index - 1)
                }
            })
        } else {
            res.send('No deck found')
            next();
        }
    })

    doc.save();
    res.send(doc.decks);
})

// Edit card in deck in user
router.post('/:username/deck/:deckid/card/edit/:cardid', async (req: Request, res: Response) => {
    const doc: any = await userModel.findOne({username: req.params.username});

    if (!doc) {
        res.send('No document found;');
    }

    doc.decks.forEach((deck: Deck, deckIndex: number) => {
        if (deck._id == req.params.deckid) {
            deck.cards.forEach((card: Card, cardIndex: number) => {
                if (card._id == req.params.cardid) {
                    doc.decks[deckIndex].cards[cardIndex].question = req.body.question;
                    doc.decks[deckIndex].cards[cardIndex].explanation = req.body.explanation;
                    doc.save();
                    res.send(doc.decks)
                }
            })
        } else {
            res.send('No index found');
        }
    })
})




// Export
export = router;