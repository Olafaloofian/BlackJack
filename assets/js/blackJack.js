const cCards = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'];
const dCards = ['d01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13'];
const hCards = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13'];
const sCards = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13'];
let deck = [];

const blackJack = {
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
    dealCards(deck){

        let cards = deck.splice(0, 4);
        
        //player Card
        this.drawCard(cards[0], 'player1')
        //dealer Card
        this.drawCard(cards[1], 'dealer1')
        //player Card
        this.drawCard(cards[2], 'player2')
        //dealer Card
        this.drawCard(cards[3], 'dealer2')


    },
    drawCard(card, id, i)
    {
        console.log(`Element: ${card} owner: ${id} index: ${i}`);
        cardDiv = document.getElementById(id)
        cardDiv.dataset.suite = this.getSuite(card.substring(0, 1))
        cardDiv.dataset.value = Number(card.substring(1, 3));

        //build Img
        let img = document.createElement('img') //'/assets/images/cards/BlueCardBack.png'

        if(Number(id.substring(id.length - 1, id.length)) <= 1){
            img.src = `/assets/images/cards/${card}.png`
        }
        else
        {
            img.src ='/assets/images/cards/BlueCardBack.png'
        }
        cardDiv.appendChild(img)


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
    }

}

window.onload = () => {
//combine cards
    deck = [].concat(cCards, dCards, hCards, sCards); 
    
    //shuffle card
    let myDeck = blackJack.shuffleCards(deck);
    console.log('Shuffled Cards: ' + myDeck.length);

    deck = myDeck;

}


document.getElementById('deal').addEventListener('click', function(e){
    blackJack.dealCards(deck);
});
