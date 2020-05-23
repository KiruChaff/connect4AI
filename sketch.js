const cols =  7;
const rows = 6;
const players = ['R', 'B'];
let board = [
];
let curPlayer;
const AI_ENABLE = true;

function setup(){
    createCanvas(720, 700);
    frameRate(30);
    h = height / rows;
    w = width / cols;
    for (let i=0; i<rows; i++){
        row = []
        for (let j=0; j<cols; j++){
            row.push("");
        }
        board.push(row);
    }
    curPlayer = floor(random(players.length));
    print(players[curPlayer]+"'s turn!");
}

function mousePressed(){
    let j = floor(mouseX/w);
    for (let i=rows-1; i>=0; i--){
        if (board[i][j] == ''){
            board[i][j] = players[curPlayer];
            curPlayer = ++curPlayer % players.length;
            if (AI_ENABLE) {
                move = ai_move()
                if (boolean(move.length))
                    board[move[0]][move[1]]=players[curPlayer];
                curPlayer = ++curPlayer % players.length;
            }
            break;
        }

    }
}

function connected4(a,b,c,d){
    return a == b && b == c && c == d && d != '';
}

function checkWin(){
    //horizontal
    for (let i=0; i<rows; i++)
        for (let j=0; j<cols-3; j++)
            if (connected4(board[i][j],board[i][j+1],board[i][j+2],board[i][j+3]))
                return board[i][j];
    //vertical
    for (let i=0; i<rows-3; i++)
        for (let j=0; j<cols; j++)
            if (connected4(board[i][j],board[i+1][j],board[i+2][j],board[i+3][j]))
                return board[i][j];
    // l-r diagonal
    for (let i=0; i<rows-3; i++)
        for (let j=0; j<cols-3; j++)
            if (connected4(board[i][j],board[i+1][j+1],board[i+2][j+2],board[i+3][j+3]))
                return board[i][j];
    // r-l diagonal
    for (let i=0; i<rows-3; i++)
        for (let j=3; j<cols; j++)
            if (connected4(board[i][j],board[i+1][j-1],board[i+2][j-2],board[i+3][j-3]))
                return board[i][j];
    tie = true;
    for (let i=0; i<cols;i++)
        if (!board[0][i]){
            tie = false;
            break;
        }
    if (tie)
        return 'tie';
    return;
}


function draw() {
    background(0);
    stroke(255);
    strokeWeight(4);
    for (let i = h; i<h*rows; i+=h){
        for (let j = w; j<w*cols; j+=w){
            line(0, i, width, i);
            line(j, 0, j, height);
        }
    }
    for (let i=0; i<rows; i++){
        for (let j=0; j<cols; j++){
            let y = i * h + h/2;
            let x = j * w + w/2;
            let r = w/2;
            if (board[i][j]!=''){
                if (board[i][j] == 'R')
                    fill(255, 0, 0);
                else if (board[i][j] =='B')
                    fill(0, 0, 255);
                ellipse(x, y, r*2);
            }
        }
    }
    winner = checkWin()
    if (winner!=null){
        if (winner=='tie')
            print("It's a tie!");
        else
            print(winner+' has won!');
        noLoop();
    }
}
