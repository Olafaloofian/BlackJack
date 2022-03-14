const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'] //blask
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'] //red
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'] //red
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'] //black
let backStack = [];
let frontStack = [];
let diamondStack = [], heartStack = [], clubStack = [], spadeStack = [];
let sections = [1, 2, 3, 4, 5, 6, 7];  //number of cards in stack
let stack1 = [];
let stack2 = [];
let stack3 = [];
let stack4 = [];
let stack5 = [];
let stack6 = [];
let stack7 = [];
let CardInPlay = [];
let CardSpot = [];
let selectedCardArr = [];
let SelectedCardA = [];

const Solitaire = {
     //algorithm: Fisher-Yates (aka Knuth) Shuffle. 
    //for more read: https://bost.ocks.org/mike/shuffle/
    shuffleCards(array)
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
    },
     //layout game
    prepareTable(myDeck) {
        for(let i = 0; i < sections.length; i++)
        {
           //Build table cards
           for(let j = 0; j < sections[i]; j++)
           {
              //console.log(`stack${i + 1}`)
              let tablecards = this.buildCardData(myDeck[0]);
              console.log(myDeck.splice(0, 1));

              switch(i + 1)
              {
                   case 1:
                       stack1.push(tablecards);
                       break;
                   case 2:
                       stack2.push(tablecards);
                       break;
                   case 3:
                       stack3.push(tablecards);
                       break;
                   case 4:
                       stack4.push(tablecards);
                       break;
                   case 5:
                       stack5.push(tablecards);
                       break;
                   case 6:
                       stack6.push(tablecards);
                       break;
                   case 7:
                       stack7.push(tablecards);
                       break;
              }
              
           }
        }
       
        //build deck cards
       console.log(myDeck);
       myDeck.forEach((element) => {
           let currentCard = this.buildCardData(element)
           backStack.push(currentCard);
       })
    },
    drawCards(data, index,  tally, size)
    {
        let div = document.createElement('div');
        let img = document.createElement("img");
        
        let divid = `stack${index + 1}`;

        let clientRect = document.getElementById(divid).getBoundingClientRect();
        console.log(clientRect);
        
        div.style.position = "absolute";
        let toppos = clientRect.y;
        let leftpos = clientRect.x;

        div.style.zIndex = "2";
        img.width = 150;
        img.height = 200;
        img.id =  `Img${data.suite + data.value}`;
        div.id = `div${data.suite + data.value}`;
        let src = ''
        if(tally == size )
        {
            src = `./assets/images/cards/${data.suite.substring(0, 1) + data.value}.png`;
            div.setAttribute('onclick', `Solitaire.Selectcard('div${data.suite + data.value}')`);
        }
        else
        {
            src = `./assets/images/cards/BlueCardBack.png`;
        }
        img.src = src;

        let top = `${toppos + (tally * 30)}px`; 
        let left = `${leftpos}px`;

        div.setAttribute('data-rank', `${data.rank}`);
        div.setAttribute('data-suite', `${data.suite}`);
        div.setAttribute('data-value', `${data.value}`);
        div.setAttribute('data-color', `${data.color}`);
        div.setAttribute('data-area', `stack`);
        div.setAttribute('data-index', `${index + 1}`);
        div.setAttribute('data-top', top)
        div.setAttribute('data-left', left)
        
        data = Object.assign(data, { 
            top: top,
            left: left
          });

        div.style.top = data.top;
        div.style.left = data.left

        div.append(img)
        document.body.appendChild(div);
        switch(index + 1)
        {
             case 1:
                  stack1.splice(index, 1)
                  element = stack1.push(data);
                 break;
             case 2:
              stack2.splice(index, 1)
                 element = stack2.push(data);
                 break;
             case 3:
                  stack3.splice(index, 1)
                  element = stack3.push(data);
                 break;
             case 4:
                  stack4.splice(index, 1)
                  element = stack4.push(data);
                 break;
             case 5:
                  stack5.splice(index, 1)
                  element = stack5.push(data);
                 break;
             case 6:
                  stack6.splice(index, 1)
                  element = stack6.push(data);
                 break;
             case 7:
                  stack7.splice(index, 1)
                  stack7.push(data);
                 break;
        }


    },
    buildCardData(card){
        let temp = card.substring(0, 1)
        let value = card.substring(1, 3)
        let suite = '';
        switch (temp)
        {
            case 'd':
                suite = 'diamond';
                color = 'red';
                break;
            case 'h':
                suite = 'heart';
                color = 'red';
                break;
            case 'c':
                suite = 'club';
                color = 'black';
                break; 
            case 's':
                suite = 'spade';
                color = 'black';
                break;
        }
        let rank = '';

        switch (Number(value))
        {
            case 1:
                rank = 'Ace';
                break;
            case 11:
                rank = 'Jack';
                break;
            case 12:
                rank = 'Queen';
                break;
            case 13:
                rank = 'King';
                break;
            default:
                rank = value;
            break;
        }
        let data = {
            rank:  rank,
            suite: suite,
            value: value,
            color: color,
        }

        return data;
    },
    dealHand()
    {
        for(let i = 0; i < sections.length; i++)
        {
           //Build table cards
           for(let j = 0; j < sections[i]; j++)
           {
              console.log(`stack${i + 1}`)
            //   let tablecards = this.buildCardData(myDeck[0]);
            //   console.log(myDeck.splice(0, 1));
              let element = {};

              switch(i + 1)
              {
                   case 1:
                        //stack1.splice(i, 1)
                        element = stack1[j];
                       break;
                   case 2:
                        //stack2.splice(i, 1)
                       element = stack2[j];
                       break;
                   case 3:
                        //stack3.splice(i, 1)
                        element = stack3[j];
                       break;
                   case 4:
                        //stack4.splice(i, 1)
                        element = stack4[j];
                       break;
                   case 5:
                        //stack5.splice(i, 1)
                        element = stack5[j];
                       break;
                   case 6:
                        //stack6.splice(i, 1)
                        element = stack6[j];
                       break;
                   case 7:
                        //stack7.splice(i, 1)
                        element = stack7[j];
                       break;
              }

              this.drawCards(element, i, j, sections[i] - 1)
           }
        }
        // return card;
    },
}



//on load of pages
window.onload = () => {
    //combine cards
    let deck = [].concat(cCards, dCards, hCards, sCards); 
    
    //shuffle card
    let myDeck = Solitaire.shuffleCards(deck); 
    console.log('Shuffled Cards: ' + myDeck.length);

    Solitaire.prepareTable(myDeck);
    Solitaire.dealHand();
}

document.getElementById('downdeck').addEventListener('click', (event) => {

})
