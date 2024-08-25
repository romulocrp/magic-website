const deck1 = document.getElementById("deck-input1").value;
const deck2 = document.getElementById("deck-input2").value;

function deckMapping(deck) {
    var deckArray = deck.split("\n");
    const deckMap = new Object();
    for (let i = 0; i < deckArray.length; i++) {
        var cardEnsemble = deckArray[i].trim();
        if (cardEnsemble.length === 0) continue;
        var cardQtd = parseInt(cardEnsemble[0]);
        var cardName = cardEnsemble.slice(1).trim();
        deckMap[cardName] = cardQtd;
    }    
    return deckMap;
}    

function comparingDecks(deck1, deck2) {
    objDeck1 = deckMapping(deck1);
    objDeck2 = deckMapping(deck2);
    missingCards = Object();
    pivotingDeck = Object();
    for (let j = 0; j < Object.keys(objDeck2).length; j++) {
        if (Object.keys(objDeck1).includes(Object.keys(objDeck2)[j]) === false) {
            missingCards[Object.keys(objDeck2)[j]] = objDeck2[Object.keys(objDeck2)[j]];
        } else {
            missingCards[Object.keys(objDeck2)[j]] = objDeck2[Object.keys(objDeck2)[j]] - objDeck1[Object.keys(objDeck2)[j]];
        }
    }    
    for (let z = 0; z < Object.keys(missingCards).length; z++) {
        if (missingCards[Object.keys(missingCards)[z]] >= 1) {
           pivotingDeck[Object.keys(missingCards)[z]] = missingCards[Object.keys(missingCards)[z]] 
        }
    
    }
    return pivotingDeck;
}    

function deckToHtml (deck) {
    let result = "";
    for (const [key, value] of Object.entries(deck)) {
        result += `${key}: ${value}<br>`;
    }
    return result
}    

function printResult () {
    document.getElementById("result-1-2").innerHTML = `<b>LISTA 1 PARA LISTA 2</b><br>${deckToHtml(comparingDecks(deck1, deck2))}`;
    document.getElementById("result-2-1").innerHTML = `<b>LISTA 2 PARA LISTA 1</b><br>${deckToHtml(comparingDecks(deck2, deck1))}`;
}


