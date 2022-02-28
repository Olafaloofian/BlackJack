const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'] //blask
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'] //red
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'] //black
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'] //red


const Solitaire = {

    //layout game
    dealCards(myDeck) {
        let rows = [[], [], [], [], [], [], []]
        
        // tried using foreach but for each would loop throu all playing cards.
        for(let i = 0; i <= myDeck.length; i++) {
            let c = 0;
            let cardsInPlay = this.processIteration(myDeck,  i, c) 
            
            rows[i].push(cardsInPlay);

            if(cardsInPlay.length == 7)
            {
                console.log(rows);
                break;
            }
        }

        this.displayCards(rows);
    },
    processIteration(myDeck, i, c){
        let iteration = [[1], [2], [3], [4], [5], [6], [7]];
        let card = [];
    
        for(let j = 0; j < iteration[i][0]; j++)
        {
            let mycard = myDeck[0];
            if(j == 0)
            {
                currentCard = {
                    cardId: mycard,
                    src: `/assets/images/cards/${mycard}.png`,
                    value: mycard.substring(2),
                    color: mycard.substring(0, 1) == 'h' ? 'black' : 'red',
                    x: 0,
                    y: 0,
                    direction: 'up',
                }
            }
            else
            {
                currentCard = {
                    cardId: mycard,
                    src: `/assets/images/cards/BlueCardBack.png`,
                    value: mycard.substring(2),
                    color: mycard.substring(0, 1) == 'h' ? 'black' : 'red',
                    x: 0,
                    y: 0,
                    direction: 'down'
                }
            }
    
            card.push(currentCard)
            myDeck.splice(0, 1);
        }
    
        return card;
    },
    displayCards(rows){
        console.log(rows[0]);
        var canvas = document.getElementById('gameCanvas'); 
        var ctx = canvas.getContext('2d'); 

        for(let i = 0; i < rows[0][0].length; i++){
            var imgObj = new Image();
            imgObj.src = rows[0][0][i].src;
            let x =  rows[0][0][i].x;
            let y =  rows[0][0][i].y;
            ctx.drawImage(imgObj, x, y)

            break;
        }
    },

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