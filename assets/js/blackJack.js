const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'];
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'];
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'];
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'];
let deck = [];
let playerHand = [];
let dealerHand = [];
let wins = 0.00;
let loses = 0.00;
let bank = 100;
let hand = 0;
let dhand = 0;
let games = 0;
let bet = 0;

const blackJack = {
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
    clearTable(){
        document.querySelectorAll('.card').forEach(n => n.remove());
    },
    dealCards(){
        dhand = 0;
       if(bet == 0) 
       {
            let modal = document.getElementById("myModal");
            modal.style.display = "block";
            return;
       }
        if(playerHand.length > 1)
        {
            this.clearTable()
        }
        playerHand = []; //clear player hands
        
        let cards = deck.splice(0, 4);
        
        //player Card
        setTimeout(this.drawCard(cards[0], 'player1'), 3000)
        //dealer Card
        setTimeout(this.drawCard(cards[1], 'dealer1'), 3000)
        //player Card
        setTimeout(this.drawCard(cards[2], 'player2'), 3000)
        //dealer Card
        setTimeout(this.drawCard(cards[3], 'dealer2'), 3000)


    },
    drawCard(card, id, showface)
    {
        document.getElementById('hand').innerText = `Hand: ${hand}`;
        console.log(`Element: ${card} owner: ${id}`);
        cardDiv = document.createElement('div')
        console.log(`Card: ${card}`);
        cardDiv.dataset.suite = this.getSuite(card.substring(0, 1))
        cardDiv.dataset.value =  Number(card.substring(1, 3)) > 9 ? 10  : Number(card.substring(1, 3)),
        cardDiv.dataset.cardId = card;

        //build Img
        let img = document.createElement('img') //'/assets/images/cards/BlueCardBack.png'

        if(Number(id.substring(id.length - 1, id.length)) <= 1 || showface == true){
            img.src = `/assets/images/cards/${card}.png`
        }
        else
        {
            img.src ='/assets/images/cards/BlueCardBack.png'
            
        }
        pcard = {
            suite: this.getSuite(card.substring(0, 1)),
            value:  Number(card.substring(1, 3)) > 9 ? 10  : Number(card.substring(1, 3)),
            rank: this.getRank(Number(card.substring(1, 3))),
            cardId: card,
        }
        if(id.substring(0, 6) === 'player')
        {
            if(id != 'player1')
            {
                cardDiv.setAttribute('onclick', `blackJack.flipCard(this)`); 
            }           
            playerHand.push(pcard)
        }
        else{
            dealerHand.push(pcard)
        }
  
        cardDiv.appendChild(img);
        cardDiv.classList.add("card");
        if(id.substring(0, 6) == 'player')
        {   
            cardDiv.id = id;
            document.getElementById('playerContainer').appendChild(cardDiv);
        }
        else{
            cardDiv.id = id;            
            document.getElementById('dealerContainer').appendChild(cardDiv);
        }

    },
    getRank(value)
    {
        switch(value){
            case 1:
                return 'Ace';
            break
            case 11:
                return 'Jack';
            break;
            case 12: 
                return 'Queen';
                break;
            case 13:
                return 'King';
            break;
            default:
                return value;
        }
    },
    getSuite(value){
        switch(value){
            case 'c':
                return 'Club';
                break;
            case 'd':
                return 'Diamond';
                break;
            case 'h':
                return 'Heart';
                break;
            case 's':
                return 'Spade';
                break;
        }
    },
    flipCard(element){
        let div = document.getElementById(element.id)
        if(div.children.length > 0) {
            div.children[0].src = `/assets/images/cards/${div.dataset.cardId}.png`
            div.setAttribute('onclick', ``); 
        }
        else{
            document.getElementById(div.id).children[0].src = `/assets/images/cards/${div.dataset.cardId}.png`
            div.getElementById(div.id).setAttribute('onclick', ``); 
        }

        let  aceFound = false;
        playerHand.forEach(element => {
             if(element.value == 1) {
                aceFound = true;
             } 

             hand += element.value
        });
        if(aceFound && (hand + 10) < 21){
            hand += 10;
        }
        document.getElementById('hand').innerText = `Hand: ${hand}`;
    },
    async hit(){
        console.log('hit')
        let id = `player${playerHand.length + 1}`
        let card = deck.splice(0, 1)
        await this.drawCard(card[0], id, true)

        let  aceFound = false;
        playerHand.forEach(element => {
             if(element.value == 1) {
                aceFound = true;
             } 

             hand += element.value
        });
        if(aceFound && (hand + 10) < 21){
            hand += 10;
        }
        
        if(hand = 21){
            console.log(`player bust with ${dhand}!`)
            wins += (bet * 2);
            bank += bet;
            bet = 0;
            document.getElementById('bet').innerText = `Bet: ${bet}`;
            document.getElementById('winnings').innerText = `Wins: $${wins}`;
            document.getElementById('bankamount').innerText = `Bank: $${bank}`;
        }
        if(hand > 21){
            console.log(`player bust with ${dhand}!`)
            loses += bet;
            bet = 0;
            document.getElementById('bet').innerText = `Bet: ${bet}`;
            document.getElementById('loses').innerText = `loses: $${loses}`;
            document.getElementById('games').innerText = `Games:${games++}`;
            this.stay(true);
        }
        document.getElementById('hand').innerText = `Hand: ${hand}`;
    },
     async stay(playerBusted){
         dhand = 0;
        let  aceFound = false;
        await  dealerHand.forEach((element) => {
            console.log(element.cardId) 
            if(element.value == 1) {
                aceFound = true;
             }
            dhand += element.value
            let temp = document.getElementById('dealer2').children[0].src =  `/assets/images/cards/${element.cardId}.png`
        })

        if(aceFound && (dhand + 10) < 21){
            dhand += 10;
        }
        if(playerBusted){
            return;
        }
        while(dhand < 17)
        {
            let id = `dealer${dealerHand.length + 1}`
            let card = deck.splice(0, 1);
            let tmp = card[0];
            this.drawCard(tmp, id, true)
            dhand += Number(tmp.substring(1, 3)) > 9 ? 10  : Number(tmp.substring(1, 3))
        }
        if(hand > 21){
            console.log(`player bust with ${dhand}!`)
        }
        else if(dhand > 21){
            console.log(`dealer bust with ${hand}`)
            wins += bet;
            bank += (bet * 2);
            bet = 0;
            document.getElementById('bet').innerText = `Bet: ${bet}`;
            document.getElementById('winnings').innerText = `Wins: $${wins}`;
            document.getElementById('bankamount').innerText = `Bank: $${bank}`;
            // document.getElementById('loses').innerText = `loses: $${loses}`;
        }
        else if(dhand > 21 && hand > 21){
            console.log(`Both dealer (${dhand}) and player (${hand}) bust!`)
        }
        else if(dhand == 21 && hand < 21){
            console.log(`Dealer wins(${dhand})`)
            loses += bet;
            bet = 0;
            document.getElementById('bet').innerText = `Bet: ${bet}`;
            document.getElementById('loses').innerText = `loses: $${loses}`;
        }
        else if(dhand == hand)
        {
            console.log(`Push dealer (${dhand}) and player (${hand})!`)
        }
        else {
            console.log(`player ${hand} wins !`)
            wins += bet;
            bank += (bet * 2);        
            document.getElementById('bet').innerText = `Bet: ${bet}`;
            document.getElementById('winnings').innerText = `Wins: $${wins}`;
            document.getElementById('bankamount').innerText = `Bank: $${bank}`;
            bet = 0;
        }

        
        dhand = 0;
        hand = 0;
        document.getElementById('hand').innerText = `Hand: ${hand}`;
        document.getElementById('games').innerText = `Games:${games++}`;
    },
    placeBet(amount){
        let tmp = amount;
        let tmp2 = bank;
        let tmp3 = tmp2 - tmp

        if(tmp3 < 0)
        {
            alert('You don\'t have enough funds for that bet.')
            return;
        }

        bet += amount;
        bank = bank - amount
        document.getElementById('bankamount').innerText = `Bank: $${bank}`;
        document.getElementById('bet').innerText = `Bet: ${bet}`;
    }
}

window.onload = () => {
    //combine cards
    deck = [].concat(cCards, dCards, hCards, sCards); 

    //shuffle card
    let myDeck = blackJack.shuffleCards(deck);
    console.log('Shuffled Cards: ' + myDeck.length);

    deck = myDeck;

    document.getElementById('hand').innerText = `Hand: ${hand}`;
    document.getElementById('bankamount').innerText = `Bank: $${bank}`;
    document.getElementById('winnings').innerText = `Wins: $${wins}`;
    document.getElementById('loses').innerText = `loses: $${loses}`;
    document.getElementById('games').innerText = `Games:${games}`;
}


document.getElementById('deal').addEventListener('click', function(e){
    blackJack.dealCards(deck);
});

document.getElementById('hit').addEventListener('click', function(e){
    blackJack.hit(e);
});
document.getElementById('stay').addEventListener('click', function(e){
    blackJack.stay();
});

document.getElementById('bet5').addEventListener('click', function(e){
    blackJack.placeBet(5);
});

document.getElementById('bet10').addEventListener('click', function(e){
    blackJack.placeBet(10);
});
document.getElementById('bet15').addEventListener('click', function(e){
    blackJack.placeBet(15);
});
document.getElementById('bet20').addEventListener('click', function(e){
    blackJack.placeBet(20);
});
document.getElementById('bet25').addEventListener('click', function(e){
    blackJack.placeBet(25);
});