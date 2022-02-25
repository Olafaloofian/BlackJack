# Solitaire-Game

General Requirements
•	This is a solo project!
o	Just to clarify, you may do the same game as another student, but you may not work together
•	This game cannot be a game or assignment we've already done in class
•	This game must run in a web browser
•	This game must be tracked in Github, with a minimum on 10 commits
•	Ideally, put your empty project up on Github on day one of development and aim for multiple commits per day
•	This game must be deployed on Github Pages or another location
Game Requirements
•	This game can be designed for 2 or more players (PvP) or 1 player (PvE)
o	The second player in a PvP game can be a person or an AI
o	For multi-player games, turns should switch appropriately between players
•	This game should be winnable or it should keep score (whichever makes more sense)
•	When a player wins or loses, the game status and/or score should display visually to the player in a way that does not rely on console.logs or alerts
•	If there is a valid draw (tie) condition in your chosen game, that should be implemented
•	HTML, CSS, and JavaScript should live in separate files
•	Effort must be spent on styling and appearance
•	The HTML code should use sematic tags
•	The game should have a Readme.md file in the Github repository that describes the inspiration for the game, explains the controls and how to play the game, lists the technologies used to build the game, and addresses any outstanding bugs or unfinished functionality
Bonus Ideas
•	Make persistent scores in your browser's localStorage
•	Add interesting music or sound effects to your game
Deliverables
•	A link to your game, which is deployed somewhere on the internet
•	A link to your Github repository, so we can see the progress on your game

Solitaire game
Property Game background = card table
Deck of Cards = 52
Diamonds = [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]
Hearts   = [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]
Clubs   = [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]
SPADE  = [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]
Loadgame function randomly layout cards.
Layout  - the bank = 4 empty space for Aces 
the idea of the game is to get the cards into the correct sequence in the bank slot.  The correct sequence is [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K]
Will track the time and number of moves
7 card spots
Initial cards number of cards per spot = [1, 2, 3, 4, 5 ,6 , 7] 
card will be laid at random
 Hints – when player gets stuck

Project Requirements
Load Layout
sequence cards
keep score 
track time 
track moves made

Functional pieces
User click -> on desk -> display the next card in the Deck
user selects card drag to the correct 

Styling ideas
