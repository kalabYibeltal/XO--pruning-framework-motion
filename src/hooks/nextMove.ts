import WinCheck from "./winCheck";

export default function NextMove({board, turn}: {board: string[][], turn: string}) {
  return new Promise<number[]>(async (resolve, reject) => {
      const availableMoves:number[][] = [];
      
      board.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === "") {
            availableMoves.push([i, j]);
          }
        });
      });

      // const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]; 

  const bestMove =  await BestMove({board, turn, availableMoves, depth: 0, alpha: -Infinity, beta: Infinity, maxPlayer: true})
  if (typeof bestMove === 'number') {
    resolve([0, 0]);
  } else {
    resolve(bestMove);
  }

}) 

}

export async function BestMove({board, turn, availableMoves,depth, alpha, beta, maxPlayer}: {board: string[][], turn: string, availableMoves: number[][], depth:number, alpha:number, beta:number, maxPlayer: boolean}) {
  if (availableMoves.length === 0) {
    return 0;
  }
 
  if (maxPlayer) {

      let bestValue = -Infinity;
      let bestMove = availableMoves[0];
      for(let i = 0; i < availableMoves.length; i++) {

        const [x, y] = availableMoves[i];
        board[x][y] = turn;
        
        const val = await WinCheck(board)

        if (val === turn) {
          board[x][y] = "";
          if (depth === 0){
            return [x, y]
          }
          return Infinity;
        }
      
        const score = Number(await BestMove({board, turn: turn === "X" ? "O" : "X", availableMoves: availableMoves.filter((_, index) => index !== i), depth: depth + 1, alpha, beta, maxPlayer: false }) );

        

          if (!Array.isArray(score) && score > bestValue) {
            bestValue = score;
            bestMove = [x, y];
          }

        

        board[x][y] = "";
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }

      }

      if (depth === 0){
        return bestMove
      }
      return bestValue
  }


  else {

    let bestValue = Infinity;
    let bestMove = availableMoves[0];
    for(let i = 0; i < availableMoves.length; i++) {

      const [x, y] = availableMoves[i];
      board[x][y] = turn;
      
      const val = await WinCheck(board)

      if (val === turn) {
        board[x][y] = "";
        return -Infinity;
      }
    
      const score = Number(await BestMove({board, turn: turn === "X" ? "O" : "X", availableMoves: availableMoves.filter((_, index) => index !== i), depth: depth + 1, alpha, beta, maxPlayer: true }) );

        if (!Array.isArray(score) && score < bestValue) {
          bestValue = score;
          bestMove = [x, y];
        }


      board[x][y] = "";
      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break;
      }

    }

    if (depth === 0){
      return bestMove
    }
    return bestValue
}
}