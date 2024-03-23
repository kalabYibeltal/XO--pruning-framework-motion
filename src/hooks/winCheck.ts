export default function WinCheck(board: string[][]) {
  const lines = [
    // Horizontal
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    // Vertical
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    // Diagonal
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
  ];
  
  return new Promise<string>((resolve, reject) => {
    for (let i = 0; i < lines.length; i++) {

        const [[ax,ay],[bx,by],[cx,cy]] = lines[i];
        
        if (board[ax][ay] !== "" && board[ax][ay] === board[bx][by] && board[bx][by] === board[cx][cy]) {
          resolve(board[ax][ay])
        }
    }
    resolve("");
  
  })

  
}