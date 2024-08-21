let movelist = []
//cg-wrap orientation-black manipulable
//cg-wrap orientation-white manipulable

function getcords(notation, side, boardWidth) {
    //e4 e5 h1 h5
    if(side === "white"){
        let charcode = ["a","b","c","d","e","f","g","h"]
        let yCode = [8,7,6,5,4,3,2,1]
        let n = notation[0].toLowerCase()
        let x = charcode.indexOf(n)
        let y = yCode.indexOf(parseInt(notation[1]))
        return {x: x*boardWidth/8, y: y*boardWidth/8}
    }
    else if(side === "black"){
        let charcode = ["a","b","c","d","e","f","g","h"]
        charcode.reverse()
        let yCode = [1,2,3,4,5,6,7,8]
        let n = notation[0].toLowerCase()
        let x = charcode.indexOf(n)
        let y = yCode.indexOf(parseInt(notation[1]))
        return {x: x*boardWidth/8, y: y*boardWidth/8}
    }
    else{
        return {x: 0, y: 0}
    }
}

function getSide(){
    if(document.getElementsByClassName("cg-wrap orientation-white manipulable").length == 1){
        return "white"
    }
    else if(document.getElementsByClassName("cg-wrap orientation-white manipulable").length == 0){
        return "black"
    }
    else{
        return "none"
    }
}

let square1 = document.createElement("div")
square1.style.position = "absolute"
square1.style.border = "solid red"

let square2 = document.createElement("div")
square2.style.position = "absolute"
square2.style.border = "solid red"
let added = false

document.addEventListener("keyup",(r)=>{
    if(r.key === "e"){
        let nbr = document.getElementsByTagName("kwdb").length
        let chessboard = document.getElementsByTagName("cg-board")[0]
        if(!added && chessboard != undefined){
            chessboard.appendChild(square1)
            chessboard.appendChild(square2)
            added = true
        }

        let width = document.getElementsByTagName("cg-board")[0].offsetWidth
        
        side = getSide()
        if(nbr >0){
            Array.from(document.getElementsByTagName("kwdb")).forEach((e, i)=>{
                movelist.push(e.innerHTML)
            })
            ////message
            chrome.runtime.sendMessage({pos: movelist},(response)=>{
                console.log(response.res)
                // Array
                let listMove = response.res
                //[ e2, e4]
                s1 = getcords(listMove[0], side, width)
                s2 = getcords(listMove[1], side, width)
                console.log(listMove)
                ///// Squarriririinnngg
                square1.style.width = `${width/8}px`
                square1.style.height = `${width/8}px`
                square2.style.width = `${width/8}px`
                square2.style.height = `${width/8}px`
                ////placing
                square1.style.top = `${s1.y}px`
                square1.style.left = `${s1.x}px`
                square2.style.top = `${s2.y}px`
                square2.style.left = `${s2.x}px`
                
            });
            ////
            movelist = []
        }
        else{
            console.log("Non")
        }
    }
})

