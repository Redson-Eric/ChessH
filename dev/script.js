let config = {
    showNotation: false,
    position: 'start'
}



let board = Chessboard('board', config)


document.addEventListener("DOMContentLoaded",()=>{
    console.log("loaded")
    chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
        board.orientation(request.orient)
        board.position(request.fen)
        //console.log(request.moves)
        // ["e4", "e5"]
        //info depth 10 seldepth 12 multipv 1 score cp 31 nodes 7103 nps 229129 hashfull 4 tbhits 0 time 31 pv d2d4 d7d5 e2e3 g8f6 c2c4 e7e6 g1f3 f8e7 b1c3
        //info depth 10 seldepth 7 multipv 1 score mate -3 nodes 369 nps 18450 time 20 pv h5h6 f3g3 h6h7 c3e2 h7h6 f8h8 bmc 0
        //console.log(document.querySelector("div[data-square]"))
        document.querySelector(`div[data-square=${request.moves[0]}]`).style.backgroundColor = "rgba(255,0,0,0.5)"
        document.querySelector(`div[data-square=${request.moves[1]}]`).style.backgroundColor = "rgba(255,0,0,0.5)"
        if(request.message.includes("info depth 10")){
            let text = document.getElementById("score")
            //mate
            if(request.message.includes("score mate")){
                text.innerText = `Mate in ${request.message.split("score mate ")[1].split(" ")[0]}`
            }
            //score
            else if(request.message.includes("score cp")){
                let score = request.message.split("score cp ")[1].split(" ")[0]
                // turn w b
                score = parseInt(score)
                if(request.turn === 'b'){
                    const mul = -1
                    text.innerText = `Score : ${(score/100)}`
                }
                else if(request.turn === 'w'){
                    const mul = 1
                    text.innerText = `Score : ${(score/100)}`
                }
                
                
            }
            else{
                text.innerText = "undefined"
            }
        }
    })
})


