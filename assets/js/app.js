const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'] //blask
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'] //red
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'] //red
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'] //black
let xprozimity = 10;
let yprozimity = 50;
let rows = [[], [], [], [], [], [], []]
let backStack = [];
let frontStack = [];
let card = [];
let diamondStack = [], heartStack = [], clubStack = [], spadeStack = [];

let selectedCardObj = {};
let selectedCardArr = [];



const Solitaire = {

    //layout game
     prepare(myDeck) {

       BuildCards = [1, 2, 3, 4, 5, 6, 7];
       let currentCard = {};

       BuildCards.forEach((element) => {
           let j = 1;
           for(let i = 1; i <= (8 - element); i++)
           {               
                let mycard = myDeck[0];
                let pos = document.getElementById(`stack${element}`).getBoundingClientRect();
                let suite = mycard.substring(0, 1)

                switch (suite)
                {
                    case 'd':
                        suite = 'diamond';
                        break;
                    case 'h':
                        suite = 'heart';
                        break;
                    case 'c':
                        suite = 'club';
                        break; 
                    case 's':
                        suite = 'spade';
                        break;
                }

                if(i == element){
                    currentCard = {
                        cardId: mycard,
                        src: `/assets/images/cards/${mycard}.png`,
                        value: mycard.substring(2),
                        color: mycard.substring(0, 1) == 'h' ? 'black' : 'red',
                        x: pos.left + window.scrollX,
                        y: pos.top + window.scrollY,
                        direction: 'up',
                        suite: suite,
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
                        direction: 'down',
                        suite: suite,
                    }
                }

                rows[element - 1].push(currentCard)
                myDeck.splice(0, 1);
                console.log(element);
                currentCard = {};
                
                j++;
           }
       })
   
        myDeck.forEach(element => {
        currentCard = {
            cardId: element,
            src: `/assets/images/cards/${element}.png`,
            value: element.substring(2),
            color: element.substring(0, 1) == 'h' ? 'black' : 'red',
            x: 0,
            y: 0,
            direction: 'down',
        }
        backStack.push(currentCard);
        //myDeck.splice(0, 1);
        });
            
    },
     CreateCard(element, index, topIndex) {

        let div = document.createElement('div');
        let img = document.createElement("img");
        let divid = `stack${index + 1 + topIndex}`;
        console.log(divid);
        let pos = document.getElementById(divid).getBoundingClientRect();
        console.log(pos);
        div.style.position = "absolute"
        let toppos = element.y;
        let leftpos = element.x;
        if(topIndex > 0)
        {
            toppos = toppos + (30 * topIndex);
        }
        //if(index ==  1 &&  topIndex )

        div.style.top = `${toppos}px`; 
        div.style.left = `${leftpos +  (160 * topIndex)}px`;
        div.style.zIndex = "2";
        img.width = 150;
        img.height = 200;
        img.id =  `${element.cardId}Img`;

        let src = ''
        if(index == 0)
        {
            src = `/assets/images/cards/${element.cardId}.png`;
        }
        else
        {
            src = `/assets/images/cards/BlueCardBack.png`;
        }
        img.src = src;
        div.id = `div${element.cardId}`
        div.setAttribute('onclick', `playcard('div${element.cardId}')`);
        div.append(img)
        document.body.appendChild(div);
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
}


function processStack(stack, mysuite) {
    if(stack.length == 0 && mysuite.value == 1)
    {
        let selected = document.getElementById(`frontStack${mysuite.suite.substring(0, 1) + mysuite.value}`);
        let moveto = document.getElementById(mysuite.suite).getBoundingClientRect();
        selected.style.left = moveto.x + 'px';
        selected.style.top = moveto.y + 'px';
        selected.style.cssText += 'border: 0px solid #fff;'
        selected.removeAttribute('onclick');
        selected.setAttribute('onclick', `selectspot('${mysuite.suite}')`);

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
                    processStack(diamondStack[0], mysuite);
                    diamondStack.splice(0, 1);
                }
                break;
            case 'heart':
                if(heartStack.length > 0)
                {
                    processStack(heartStack[0], mysuite);
                    heartStack.splice(0, 1);
                }
                break;
            case 'club':
                if(clubStack.length > 0)
                {
                    processStack(clubStack[0], mysuite);
                    clubStack.splice(0, 1);
                }
                break; 
            case 'spade':
                if(spadeStack.length > 0)
                {
                    processStack(spadeStack[0], mysuite)
                    spadeStack.splice(0, 1);
                }
                break;
        }
        return;
    }
}

function selectspot(event)
{
    if(selectedCardArr.length > 0){
        let scard = selectedCardArr[0];
        switch (scard.suite)
        {
            case 'diamond':
                processStack(diamondStack, scard);
                break;
            case 'heart':
                processStack(heartStack, scard);
                break;
            case 'club':
                processStack(clubStack, scard);
                break; 
            case 'spade':
                processStack(spadeStack, scard);
                break;
        }
        
    }
}

function playcard(selection){
    alert(selection);
}

function selectDiscarded(event){
    let sid = event.substring(10, 11);
    let value = event.substring(11, 13);
    let suite = '', color = ''


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
    }

    selectedCardObj = selectedCard;
    selectedCardArr.push(selectedCardObj);
    document.getElementById(event).style.cssText += 'border: 3px solid #fff;'

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
            let img = document.getElementById(`frontStack${element.cardId}`)
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
    
    if(backStack.length == 1){
        document.getElementById('backStackImg').src = '/assets/images/Restock.png'
    }

    let div = document.createElement('div')
    
    let img = document.createElement("img");
    img.src = `http://127.0.0.1:8080/assets/images/cards/${myCard.cardId}.png`
    let pos = document.getElementById(`updeck`).getBoundingClientRect();

    console.log(pos);
    div.style.position = "absolute"
    div.style.top = `${pos.top + window.scrollY}px`; 
    div.style.left = `${pos.left + window.scrollX}px`;
    div.width = 150;
    div.height = 200;
    //selector img[id^="frontStack"]
    div.id = 'frontStack' + myCard.cardId;
    div.style.zIndex = 2;
    
    //div.onclick = ;
    div.setAttribute('onclick', `selectDiscarded('frontStack${myCard.cardId}')`)

    div.appendChild(img)

    document.body.appendChild(div);
    backStack.splice(0, 1);
})