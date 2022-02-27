const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'] //blask
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'] //red
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'] //black
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'] //red
let  aRow = [];
let  bRow = [];
let  cRow = [];
let  dRow = [];
let  eRow = [];
let  fRow = [];
let  gRow = [];

const Solitaire = {


    //layout game
    dealCards(myDeck) {
        let rows = [sRow, bRow, cRow, dRow, eRow, fRow, gRow]
         
        for(let i = 0; i <= myDeck.length; i++) {
            let c = 0;
            let cardsInPlay = innerIteration(myDeck,  i, c) 
            
            row[i].push(cardsInPlay);

            if(cardsInPlay.length == 1)
            {
                break;
            }
            console.log(cardsInPlay)
        }
    },
}

function innerIteration(myDeck, i, c){
    let iteration = [[7, aRow], [6, bRow], [5, cRow], [4,dRow], [3, eRow], [2, fRow], [1, gRow]];
    let card = [];

    for(let j = 0; j < iteration[i][0]; j++)
    {
        if(j == 0)
        {
            card.push(myDeck[0]);
            myDeck.splice(0, 1);
        }
        else
        {
            card.push(myDeck[0])
            myDeck.splice(0, 1);
        }
    }

    return card;
}

//algorithm: Fisher-Yates (aka Knuth) Shuffle. 
//for more read: https://bost.ocks.org/mike/shuffle/
function shuffleCards(array)
{
    var m = array.length, t, i;
    while (m > 0) 
    {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

window.onload = async () => {
    //combine cards
    let deck = [].concat(cCards, dCards, hCards, sCards); 
    //console.log('combined cards:' + deck);
    //shuffle card
    let myDeck = await shuffleCards(deck);
    console.log('Shuffled Cards: ' + myDeck);

    //dealCards
    Solitaire.dealCards(myDeck)
}