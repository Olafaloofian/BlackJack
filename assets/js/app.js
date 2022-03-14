const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'] //blask
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'] //red
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'] //red
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'] //black
let xprozimity = 10;
let yprozimity = 50;
let backStack = [];
let frontStack = [];
//let card = [];
let diamondStack = [], heartStack = [], clubStack = [], spadeStack = [];
let sections = [1, 2, 3, 4, 5, 6, 7];
let tableCards = [];
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
     prepare(myDeck) {

         for(let i = 0; i < sections.length; i++)
         {

            //Build table cards
            for(let j = 0; j < sections[i]; j++)
            {
               console.log(`stack${i + 1}`)
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
                       element = stack1[j];
                       break;
                   case 2:
                       element = stack2[j];
                       break;
                   case 3:
                        element = stack3[j];
                       break;
                   case 4:
                        element = stack4[j];
                       break;
                   case 5:
                        element = stack5[j];
                       break;
                   case 6:
                        element = stack6[j];
                       break;
                   case 7:
                        element = stack7[j];
                       break;
              }

              this.drawCards(element, i, j, sections[i] - 1)
           }
        }
        // return card;
    },
    drawCards(data, index,  tally, size)
    {
        // data
        //     rank:  rank,
        //     suite: suite,
        //     value: value,
        //     color: color,
        let div = document.createElement('div');
        let img = document.createElement("img");
        
        let divid = `stack${index + 1}`;

        let clientRect = document.getElementById(divid).getBoundingClientRect();
        console.log(clientRect);

        div.style.position = "absolute";
        let toppos = clientRect.y;
        let leftpos = clientRect.x;
        // if(index > 0)
        // {
        //     toppos = toppos + (30 * index);
        // }
        
        div.style.top = `${toppos + (tally * 30)}px`; 
        div.style.left = `${leftpos}px`;
        div.style.zIndex = "2";
        img.width = 150;
        img.height = 200;
        img.id =  `Img${data.suite + data.value}`;
        div.id = `div${data.suite + data.value}`;
        let src = ''
        if(tally == size )
        {
            src = `./assets/images/cards/${data.suite.substring(0, 1) + data.value}.png`;
            div.setAttribute('onclick', `Solitaire.playcard('div${data.suite + data.value}')`);
        }
        else
        {
            src = `./assets/images/cards/BlueCardBack.png`;
        }
        img.src = src;

        div.setAttribute('data-rank', `${data.rank}`);
        div.setAttribute('data-suite', `${data.suite}`);
        div.setAttribute('data-value', `${data.value}`);
        div.setAttribute('data-color', `${data.color}`);
        div.setAttribute('data-area', `stack`);
        div.setAttribute('data-stack', `${index + 1}`);
      
        div.append(img)
        document.body.appendChild(div);
    },
   
    empyStack(element){


    },

    selectCard(event){
        
    },
    selectDiscarded(event){    

        let selection = document.getElementById(event);
    
        let temp = Number(selection.dataset.value);
        let cardData = {
            suite: selection.dataset.suite,
            value: selection.dataset.value,
            rank: selection.dataset.rank,
            match: temp == 13 ? 0 :  temp  + 1,
            cardId: event,
            stack: selection.dataset.stack,
            area: selection.dataset.area,
        }
        SelectedCardA.push(cardData);
       card = getCard(cardData);
    
       if(cardData.length == 1)
       {
            let caToMove =  frontStack[frontStack.length - 1] ;
            let div = document.getElementById(event);
            let clientRects = document.getElementById(event).getClientRects();
            div.style.top = clientRects[0].y + 'px';
            div.style.left = clientRects[0].x + 'px';
       }
    
        let selectedCard = constructData(event)
        selectedCardObj = selectedCard;
        selectedCardArr.push(selectedCardObj);
        document.getElementById(event).style.cssText += 'border: 3px solid #fff;'
    },
    playcard(selection){
        let selCard = document.getElementById(selection)
        this.selectDiscarded(selCard.id)
        return;
    }
}


function processStack(stack, mysuite) {

    let elementA = {}
    let elementB = {}
    let clientRect = {}

    if(stack.length == 0 && Number(mysuite.value) == 1)
    {
        //get card location of where we want to move the selected card to.
        let selected = document.getElementById(mysuite.source);
        let moveto = document.getElementById(mysuite.suite).getBoundingClientRect();
        selected.style.left = moveto.x + 'px';
        selected.style.top = moveto.y + 'px';
        selected.style.cssText += 'border: 0px solid #fff;'
        selected.removeAttribute('onclick');
        selected.setAttribute('onclick', `selectStack(this)`);

        selectedCardArr.pop(); //remove selected card move complete
        let i = 0;
        let index = frontStack.pop();

        switch (mysuite.suite)
        {
            case 'diamond':
                diamondStack.push(mysuite);
                break;
            case 'heart':
                heartStack.push(mysuite);
                break;
            case 'club':
                clubStack.push(mysuite);
                break; 
            case 'spade':
                spadeStack.push(mysuite);
                break;
        }
    }
    else{
        switch (mysuite.suite)
        {
            case 'diamond':
                if(diamondStack.length > 0)
                {
                    if(match(diamondStack[0], mysuite))
                    {
                        //move div cards
                        elementA = document.getElementById(mysuite.source)
                        elementB = document.getElementById(diamondStack[0].source)
                        clientRect = elementB.getBoundingClientRect();
                    }
                    //diamondStack.splice(0, 1);
                }
                break;
            case 'heart':
                if(heartStack.length > 0)
                {
                    if(match(heartStack[0], mysuite))
                    {
                        //move div cards
                        elementA = document.getElementById(mysuite.source)
                        elementB = document.getElementById(heartStack[0].source)  //move ElementA to ElementB locaton
                        clientRect = elementB.getBoundingClientRect();
                    }
                    //heartStack.splice(0, 1);
                }
                break;
            case 'club':
                if(clubStack.length > 0)
                {
                    if(match(clubStack[0], mysuite))
                    {
                        //move div cards
                        let elementA = document.getElementById(mysuite.source)
                        let elementB = document.getElementById(clubStack[0].source)
                        let clientRect = elementB.getBoundingClientRect();
                    }
                    //clubStack.splice(0, 1);
                }
                break; 
            case 'spade':
                if(spadeStack.length > 0)
                {

                    if(match(spadeStack[0], mysuite))
                    {
                        //move div cards
                        let elementA = document.getElementById(mysuite.source)
                        let elementB = document.getElementById(spadeStack[0].source)
                        let clientRect = elementB.getBoundingClientRect();
                    }
                    //spadeStack.splice(0, 1);
                }
                break;
        }

        elementA.top = `${clientRect.top}px`;
        elementA.left = `${clientRect.left}px`;
        return elementA;
    }
}

function match(elementA, elementB){
    if(elementA.suite == elementB.suite)
    {
        if(elementA.match == Number(elementB.value))
        {
            return true;
        }
    }

    return false;
}

function selectStack(event)
{
    let cardtoMove = '';
    let placeholder = '';
    if(event.id == undefined)
    {
        placeholder = document.getElementById(event)
    }
    else{
        placeholder = document.getElementById(event.id)
    }
    let newLocation = placeholder.getBoundingClientRect();
    if(placeholder = 'empty')
    {
        if(selectedCardArr.length > 0){
            switch(selectedCardArr[0].suite)
            {
                case 'diamond':
                    cardtoMove = processStack(diamondStack, selectedCardArr[0]);
                    break;
                case 'heart':
                    cardtoMove = processStack(heartStack, selectedCardArr[0]);
                    break;
                case 'club':
                    cardtoMove = processStack(clubStack, selectedCardArr[0]);
                    break; 
                case 'spade':
                    cardtoMove = processStack(spadeStack, selectedCardArr[0]);
                    break;
            }       
        }

    }

    let carda = SelectedCardA[0];
    let cardDiv = document.getElementById(`img${carda.cardId.substring(3, carda.cardId.length)}`)
    let data = document.getElementById(carda.cardId);
    let stackIndex = data.dataset.stack

    if(Array.isArray(CardInPlay)) {
        let cartoMove = CardInPlay[0];
        let element = document.getElementById(`div${cartoMove.suite}${cartoMove.value}`);
        element.style.top = newLocation.top + "px";
        element.style.left  = newLocation.left + "px";
        element.style.cssText += 'border: 0px solid #fff;'
        //element.onclick = `Solitaire.playcard('div${cartoMove.suite}${cartoMove.value}')`
        let cartoFlip = CardInPlay[1];
        let chgImage = document.getElementById(`div${cartoFlip.suite}${cartoFlip.value}`);
        //chgImage.onclick =  `Solitaire.playcard(this);`
        chgImage.setAttribute('onclick', `Solitaire.playcard('div${cartoFlip.suite + cartoFlip.value}')`);
        chgImage.children[0].src =  `/assets/images/cards/${cartoFlip.suite.substring(0, 1) + cartoFlip.value}.png`;
        chgImage.children[0].style.zIndex = "3";
        CardInPlay = []
        SelectedCardA = [];
    }
    else if(SelectedCardA.length == 2){
        let cardData = document.getElementById(SelectedCardA[1].cardId);
        cardData.style.left = cardtoMove.left;
        cardData.style.top = cardtoMove.top;
        //cardData.style.zIndex = 
    }
}



function constructData(played){
    let source = played;
    let suite = '', color = '';
    let sid = '';
    let value = '';
    
    let temp  = played.substring(0, 3)

    if(temp == 'div')
    {
        sid = played.substring(3, 4);
        value = played.substring(played.length - 2, played.length);
    }
    else if(played.length == 13)
    {
        sid = played.substring(10, 11);
        value = played.substring(played.length - 2, played.length);
    }

    switch(sid){
        case 'd': 
            suite = 'diamond';
            color = 'red';
        break;

        case 'h': 
            suite = 'heart';
            color = 'red';
        break;

        case 'c': 
            suite = 'club'
            color = 'black';
        break;

        case 's':
            suite = 'spade'
            color = 'black';
        break;
    }

    let selectedCard = {
        suite: suite,
        value: value,
        match: value == 13 ? 0 :  Number(value)  + 1,
        source: source,
    }
    
    return selectedCard;
}


function getCard(cardData){

    let stackIndex = [];
    switch(Number(cardData.stack))
    {
         case 1:
                    stackIndex = stack1.findIndex((data) => data.value ==  cardData.value && data.suite == cardData.suite) 
                    if(stackIndex != 0){
                        CardInPlay.push(stack1[stackIndex]);
                        CardInPlay.push(stack1[stackIndex - 1]);
                    }
                    else{
                        CardInPlay.push(stack1[stackIndex]);
                    }
            break;
         case 2:
                    stackIndex = stack2.findIndex((data) => data.value == cardData.value && data.suite == cardData.suite) 
                    if(stackIndex != 0){
                        CardInPlay.push(stack2[stackIndex]);
                        CardInPlay.push(stack2[stackIndex - 1]);
                    }
                    else{
                        CardInPlay.push(stack2[stackIndex]);
                    }
            break;
         case 3:
                    stackIndex = stack3.findIndex((data) => data.value ==  cardData.value && data.suite == cardData.suite) 
                    if(stackIndex != 0){
                        CardInPlay.push(stack3[stackIndex]);
                        CardInPlay.push(stack3[stackIndex - 1]);
                    }
                    else{
                        CardInPlay.push(stack3[stackIndex]);
                    }
            break;
         case 4:
                    stackIndex = stack4.findIndex((data) => data.value ==  cardData.value && data.suite == cardData.suite) 
                    if(stackIndex != 0){
                        CardInPlay.push(stack4[stackIndex]);
                        CardInPlay.push(stack4[stackIndex - 1]);
                    }
                    else{
                        CardInPlay.push(stack4[stackIndex]);
                    }
            break;
         case 5:
                stackIndex = stack5.findIndex((data) => data.value ==  cardData.value && data.suite == cardData.suite) 
                if(stackIndex != 0){
                    CardInPlay.push(stack5[stackIndex]);
                    CardInPlay.push(stack5[stackIndex - 1]);
                }
                else{
                    CardInPlay.push(stack5[stackIndex]);
                }
            break;
         case 6:
                stackIndex = stack6.findIndex((data) => data.value ==  cardData.value && data.suite == data.suite) 
                if(stackIndex != 0){
                    CardInPlay.push(stack6[stackIndex]);
                    CardInPlay.push(stack6[stackIndex - 1]);
                }
                else{
                    CardInPlay.push(stack6[stackIndex]);
                }
            break;
         case 7:
                stackIndex = stack7.findIndex((data) => data.value ==  cardData.value && data.suite == data.suite) 
                if(stackIndex != 0){
                    CardInPlay.push(stack7[stackIndex]);
                    CardInPlay.push(stack7[stackIndex - 1]);
                }
                else{
                    CardInPlay.push(stack7[stackIndex]);
                }
            break;
    }

    let inplay = document.getElementById(cardData.cardId);
    let index = frontStack.findIndex((data) => data.value == inplay.dataset.value) ;

    

    if(CardInPlay.length == 0)
    {
        CardInPlay = frontStack[frontStack.length - 1]
    }
    return  CardInPlay;

}

//on load of pages
window.onload = () => {
    //combine cards
    let deck = [].concat(cCards, dCards, hCards, sCards); 
    
    //shuffle card
    let myDeck = Solitaire.shuffleCards(deck);
    console.log('Shuffled Cards: ' + myDeck.length);

    Solitaire.prepare(myDeck);
    Solitaire.dealHand();
}


document.getElementById('Start').addEventListener('click', (event) => {
    //completely destroy all existing objects to start over.

    //combine cards
    let deck = [].concat(cCards, dCards, hCards, sCards); 
    
    //shuffle card
    let myDeck = Solitaire.shuffleCards(deck);
    console.log('Shuffled Cards: ' + myDeck.length);

    Solitaire.prepare(myDeck);
    Solitaire.dealHand();
})


//flip through cards on click
document.getElementById('downdeck').addEventListener('click', (event) => {
    if(backStack.length == 0){
        document.getElementById('backStackImg').src = '/assets/images/cards/BlueCardBack.png'
        let i = 0;
        frontStack.forEach((element) => {
            i++;
            let img = document.getElementById(`div${element.suite.substring(0, 1)}${element.value}`)
            img.remove()
            if(i == frontStack.length)
            {
                return;
            }            
        });

        backStack = frontStack;
        frontStack = [];
        return;
    }
    console.log(backStack.length);


    let myCard = backStack[0];
    frontStack.push(myCard);
    //let = Solitaire.buildCardData(myCard);
    
    if(backStack.length == 1){
        document.getElementById('backStackImg').src = '/assets/images/Restock.png'
    }

    let div = document.createElement('div')    
    let img = document.createElement("img");
    img.src = `./assets/images/cards/${myCard.suite.substring(0,1) + myCard.value}.png`
    let pos = document.getElementById(`updeck`).getBoundingClientRect();

    console.log(pos);
    div.style.position = "absolute"
    div.style.top = `${pos.top + window.scrollY}px`; 
    div.style.left = `${pos.left + window.scrollX}px`;
    div.width = 150;
    div.height = 200;
    //selector img[id^="frontStack"]
     div.id = `div${myCard.suite.substring(0,1) + myCard.value}`;
    div.style.zIndex = 2;
    
    div.setAttribute('data-rank', `${myCard.rank}`);
    div.setAttribute('data-suite', `${myCard.suite}`);
    div.setAttribute('data-value', `${myCard.value}`);
    div.setAttribute('data-color', `${myCard.color}`);
    div.setAttribute('data-area', `front`);
    //div.setAttribute('data-stack', `${index}`);
    //div.onclick = ;
    div.setAttribute('onclick', `Solitaire.selectDiscarded('div${myCard.suite.substring(0,1) + myCard.value}')`)

    div.appendChild(img)

    document.body.appendChild(div);
    backStack.splice(0, 1);
})