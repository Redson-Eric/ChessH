importScripts("./lib/chess_min.js")
importScripts("./lib/stockfish.asm.js")

const engine = STOCKFISH();
let moves = ["real","Aura"]
let message = "Take me back to the night we meet :("
//info depth 10 seldepth 7 multipv 1 score mate -3 nodes 369 nps 18450 time 20 pv h5h6 f3g3 h6h7 c3e2 h7h6 f8h8 bmc 0
//bestmove h5h6 ponder f3g3
engine.onmessage = function(event) {
    if(event.includes("bestmove")){
        let str = event.split(" ")[1]//e4 e5
        moves[0] = str[0]+str[1]
        moves[1] = str[2]+str[3]
    }
    else if(event.includes("info depth 10")){
        message = event
    }
}

function getFen(movelist){
    let chess = Chess()
    movelist.forEach((e, i)=>{
        chess.move(e)
    })
    return chess.fen()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    let movelist = request.movelist
    let fen = getFen(movelist)
    let turn = fen.split(" ")[1]
    engine.postMessage(`position fen ${fen}`)
    fen = fen.split(" ")[0]
    engine.postMessage("go depth 10")
    chrome.runtime.sendMessage({fen : fen, orient: request.side, moves : moves, message : message, turn: turn});
    
    /*console.log("*******************************")
    console.log(request.movelist)
    console.log(request.side)
    console.log("*******************************")*/

})