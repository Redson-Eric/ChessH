importScripts('./lib/chess_min.js');
importScripts('./lib/stockfish.asm.js')

const engine = STOCKFISH();

let moves = ["first", "second"]

engine.onmessage = function(event) {
    if(event.includes("bestmove")){
        let str = event.split(" ")[1]
        moves[0] = str[0]+str[1]
        moves[1] = str[2]+str[3]
        console.log(moves)
    }
}




chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {

    let moveList = request.pos;
    let chess = Chess();
    for(move of moveList){
      chess.move(move)
    }
    let fen = chess.fen()
    engine.postMessage(`position fen ${fen}`)
    engine.postMessage('go depth 12')
    sendResponse({res : moves})
  
  });