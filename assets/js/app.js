const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'] //blask
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'] //red
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'] //black
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'] //red
let xprozimity = 10;
let yprozimity = 50;
let rows = [[], [], [], [], [], [], []]
let cardDeck = [];
let card = [];




const Solitaire = {

    //layout game
    async prepare(myDeck) {

       BuildCards = [1, 2, 3, 4, 5, 6, 7];
       let currentCard = {};

       BuildCards.forEach((element) => {
           let j = 1;
           for(let i = 1; i <= (8 - element); i++)
           {               
                let mycard = myDeck[0];
                let pos = document.getElementById(`ph0${j}s${element}`).getBoundingClientRect();

                if(i == element){
                    currentCard = {
                        cardId: mycard,
                        src: `/assets/images/cards/${mycard}.png`,
                        value: mycard.substring(2),
                        color: mycard.substring(0, 1) == 'h' ? 'black' : 'red',
                        x: pos.left + window.scrollX,
                        y: pos.top + window.scrollY,
                        direction: 'up',
                    }
                }
                else{
                    currentCard = {
                        cardId: mycard,
                        src: `/assets/images/cards/BlueCardBack.png`,
                        FrontSrc:`/assets/images/cards/${mycard}.png`,
                        value: mycard.substring(2),
                        color: mycard.substring(0, 1) == 'h' ? 'black' : 'red',
                        x: pos.left + window.scrollX,
                        y: pos.top + window.scrollY,
                        direction: 'down'
                    }
                }

                rows[element - 1].push(currentCard)
                myDeck.splice(0, 1);
                console.log(element);
                currentCard = {};
                j++;
           }
       })
   
       await myDeck.forEach(element => {
        currentCard = {
            cardId: element,
            src: `/assets/images/cards/${element}.png`,
            value: element.substring(2),
            color: element.substring(0, 1) == 'h' ? 'black' : 'red',
            x: 0,
            y: 0,
            direction: 'down',
        }
        cardDeck.push(currentCard);
        myDeck.splice(0, 1);
        });
            
    },
    CreateCard(element, index, topIndex) {
        let img = document.createElement("img");
        let divid = `ph0${index + 1 + topIndex}s1`;
        console.log(divid);
        let pos = document.getElementById(divid).getBoundingClientRect();
        console.log(pos);
        img.style.position = "absolute"
        let toppos = pos.y;
        if(topIndex > 0)
        {
            toppos = toppos + (25 * topIndex);;
        }
        img.style.top = `${toppos}px`; 
        img.style.left = `${pos.x}px`;
        img.width = 100;
        img.height = 139;
        img.id = element.cardId;
        let src = ''
        if(index == 0)
        {
            img.className = 'makeitmove';
            src = `/assets/images/cards/${element.cardId}.png`;
        }
        else
        {
            src = `/assets/images/cards/BlueCardBack.png`;
        }
        img.src = src;
        document.body.appendChild(img);
     },

    dealHand(){
        let card = []
        let j = 0;
        rows.forEach((element) => {
            
       
            console.log('element.length' + element.length);
            console.log('element[0]' + element[0]);
            console.log('element[0][0]' + element[0][0]);
            for(let i = 0; i < element.length; i++)
            {
                console.log('i: ' + i)
                card.push(rows[i][j]);
                this.CreateCard(rows[i][j], i, j); 
                console.log('card: ' + card)
            }
            console.log('j: ' + j)
            j++;
        })

        return card;
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

    Solitaire.prepare(myDeck);
    Solitaire.dealHand();
}

let updeck = [];

document.getElementById('rowB').addEventListener('click', (event) => {
    console.log(cardDeck.length);
    let myCard = cardDeck[0];
    updeck.push(myCard);
 

    //let img = document.createElement('img')
    let img = document.createElement("img");
    let pos = document.getElementById(`rowA`).getBoundingClientRect();
    console.log(pos);
    img.style.position = "absolute"
    img.style.top = `${pos.top + window.scrollY}px`; 
    img.style.left = `${pos.left + window.scrollX}px`;
    img.width = 100;
    img.height = 139;
    img.id = myCard.cardId;
    console.log(pos);
    img.src = `http://127.0.0.1:8080/assets/images/cards/${myCard.cardId}.png`

    //let faceup = document.getElementById('rowA')
    document.body.appendChild(img);
    cardDeck.splice(0, 1);
})

