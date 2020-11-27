import Card from "./card-interface";

interface Deck {
    _id?: String,
    name: String,
    cards: Array<Card>
}

export = Deck;