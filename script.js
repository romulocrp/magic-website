state = {
    counter: 0
}    

function emptyDeckHandler (deck) {
    if (deck === "") {
        return true
    }
    return false
}    

function outOfPatternHandler (deck) {
    deckArray = deck.split("\n")
    re = /^(?!\d+ .)+/;
    for (i = 0; i < deckArray.length; i++) {
        if (deckArray[i].length === 0) continue;
        testCardEnsemble = re.test(deckArray[i]);
        if (testCardEnsemble) {
            return [true, deckArray[i]]
        }
    }
    return [false, null]
}   

function floatingCardQtd (deck) {
    deckArray = deck.split("\n");
    for (i=0; i < deckArray.length; i++) {
        if (deckArray[i].length === 0) continue;
        strValue = deckArray[i][1];
        if (strValue === "," || strValue === ".") {
            return [true, deckArray[i]]
        }
    }
    return [false, null]
}    

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
    for (let j = 0; j < Object.keys(objDeck2).length; j++) {
        if (objDeck1[Object.keys(objDeck2)[j]] === undefined) {
            missingCards[Object.keys(objDeck2)[j]] = objDeck2[Object.keys(objDeck2)[j]];
        } else {
            missingCards[Object.keys(objDeck2)[j]] = objDeck2[Object.keys(objDeck2)[j]] - objDeck1[Object.keys(objDeck2)[j]];
        }
    }    
    return missingCards;
}    

function sideInFilter(deck) {
    sideInCards = Object();
    for (let z = 0; z < Object.keys(deck).length; z++) {
        if (deck[Object.keys(deck)[z]] > 0) {
            sideInCards[Object.keys(deck)[z]] = deck[Object.keys(deck)[z]];
        }    
    }
    return sideInCards;
}    

function sideOutFilter(deck) {
    sideOutCards = Object();
    for (let t = 0; t < Object.keys(deck).length; t++) {
        if (deck[Object.keys(deck)[t]] < 0) {
            sideOutCards[Object.keys(deck)[t]] = -deck[Object.keys(deck)[t]];
        }    
    }
    return sideOutCards;
}    

function switcher(deck1, deck2) {
    const comparedDecks = comparingDecks(deck1, deck2);
    const sideIn = sideInFilter(comparedDecks);
    const sideOut = sideOutFilter(comparedDecks);
    const sideOutMissed = comparingDecks(deck2, deck1);
    const sideOutMissedCards = sideInFilter(sideOutMissed);
    return [sideIn, sideOut, sideOutMissedCards]
}    

function deckToHtml (deck) {
    let result = "";
    for (const [key, value] of Object.entries(deck)) {
        result += `${key}: ${value}<br>`;
    }
    return result
}    

function printResult () {
    
    const deck1 = document.getElementById("deck-input1").value;
    const deck2 = document.getElementById("deck-input2").value;
    const deck1Check = emptyDeckHandler(deck1);
    const deck2Check = emptyDeckHandler(deck2);
    const outPatternEnsemble1 = outOfPatternHandler(deck1);
    const outPatternEnsemble2 = outOfPatternHandler(deck2);
    const floatingQtd1 = floatingCardQtd(deck1);
    const floatingQtd2 = floatingCardQtd(deck2);
    
    if (deck1Check || deck2Check) {
        document.getElementById("switch-result").innerHTML = "<p><b>Algum deck está vazio!</b></p>";
        return 0
    }

    if (outPatternEnsemble1[0]) {
        document.getElementById("switch-result").innerHTML = `<p>Cartas fora do padrão:<br>${outPatternEnsemble1[1]}</p>`;
        return 0
    } else if (outPatternEnsemble2[0]) {
        document.getElementById("switch-result").innerHTML = `<p>Cartas fora do padrão:<br>${outPatternEnsemble2[1]}</p>`;
        return 0
    }

    if (floatingQtd1[0]) {
        document.getElementById("switch-result").innerHTML = `<p>Cartas fracionadas:<br>${floatingQtd1[1]}</p>`;
        return 0
    } else if (floatingQtd2[0]) {
        document.getElementById("switch-result").innerHTML = `<p>Cartas fracionadas:<br>${floatingQtd2[1]}</p>`;
        return 0
    }    

    if (state.counter === 0){
        const change = switcher(deck1, deck2);
        document.getElementById("switch-result").innerHTML = `<b>LISTA 1 PARA LISTA 2</b><br><i>Entra:</i><br>${deckToHtml(change[0])}<br><i>Sai:</i><br>${deckToHtml(change[1])}${deckToHtml(change[2])}`;
        document.getElementById("switch-button").innerText = "<Switch!"
        state.counter += 1
    } else {
        const change = switcher(deck2, deck1);
        document.getElementById("switch-result").innerHTML = `<b>LISTA 2 PARA LISTA 1</b><br><i>Entra:</i><br>${deckToHtml(change[0])}<br><i>Sai:</i><br>${deckToHtml(change[1])}${deckToHtml(change[2])}`;
        document.getElementById("switch-button").innerText = "Switch!>"
        state.counter -= 1
    }    
}


