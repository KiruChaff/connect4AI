let MAX_DEPTH = 5;

let scores = {
    tie:0
}
function ai_move(){
    scores[players[curPlayer]]=10;
    scores[players[(curPlayer+1)%players.length]]=-10;
    let bestMove = [];
    let recordScore = -Infinity;
    for (let i=0; i<cols; i++){
        for (let j=rows-1; j>=0; j--){
            if (board[j][i]==''){
                board[j][i]=players[curPlayer];
                score = minimax(MAX_DEPTH, false);
                score += cols/2 - abs(i-cols/2)
                board[j][i]='';
                if (score > recordScore) {
                    recordScore = score;
                    bestMove = [j, i];
                }
                break;
            }
        }
    }
    return bestMove;
}


function minimax(depth, maximize){
    let winner = checkWin();
    if (winner != null) {
        return scores[winner];
    }
    if (depth<=0){
            return 0;
    }
    let recordScore;
    if (maximize){
        recordScore = -Infinity;
        for (let i=0; i<cols; i++){
            for (let j=rows-1; j>=0; j--){
                if (board[j][i]==''){
                    board[j][i]=players[curPlayer];
                    score = minimax(depth-1, false);
                    board[j][i]='';
                    recordScore = max(recordScore, score);
                    break;
                }
            }
        }
    } else {
        recordScore = Infinity;
        for (let i=0; i<cols; i++){
            for (let j=rows-1; j>=0; j--){
                if (board[j][i]==''){
                    board[j][i]=players[(curPlayer+1)%players.length];
                    score = minimax(depth-1, true);
                    board[j][i]='';
                    recordScore = min(recordScore, score);
                    break;
                }
            }
        }
    }
    return recordScore;
}
