import { useState } from "react"
import style from "../Square/square.module.css"


const Grid = () => {
    const [turn,setTurn] = useState("X");
    let [grids,setGrids] = useState(Array(9).fill(""));
    const [winner,setWinner] = useState();
    const Square = ({num}) => {
        return(
            <div className={style.square} onClick={()=> handleClick(num)}>
                <p >{grids[num]}</p>
            </div>
        )
    }
    const handleClick = (num) => {
        if(winner){
            return;
        }
        let square = [...grids]
        if(square[num] !== ""){
            return;
        }
       if(turn==="X"){
            square[num] = "X";
           setTurn("O");
       }
       else{
            square[num] = "O";
            setTurn("X");
       }
       checkWinner(square);
       setGrids(square);
    }
    const checkWinner = (grids) => {
        const possibleWinner = {
            row:[
                    [0,1,2],
                    [3,4,5],
                    [6,7,8]
            ],
            column : [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagonal:[
                [0,4,8],
                [2,4,6]
            ]
        }
        for(let winners in possibleWinner){
            possibleWinner[winners].forEach((pattern)=>{
                if(grids[pattern[0]] ==="" || grids[pattern[1]] ==="" || grids[pattern[2]] ===""){

                }
                else if(grids[pattern[0]] === grids[pattern[1]] && grids[pattern[1]] === grids[pattern[2]]){
                    setWinner(grids[pattern[0]]);
                }
            })
        }
    }
    const handleReset = () => {
        setWinner(null);
        setGrids(Array(9).fill(""))
    }

    return (
        <>
        <p>Now this is : {turn} turn</p>
        <div className={style.container}>
        <div style={{display: 'flex'}}>
            <Square num={0} />
            <Square num={1} />
            <Square num={2}/>
        </div>
        <div style={{display: 'flex'}}>
            <Square num={3} />
            <Square num={4}/>
            <Square num={5}/>
        </div>
        <div style={{display: 'flex'}}>
            <Square num={6}/>
            <Square num={7}/>
            <Square num={8}/>
        </div>
        <div>
            {
                winner && 
                <div>
                <div>Winner is : {winner}</div>
                <button onClick={handleReset}>RESET</button>
                </div>
            }
        </div>
        </div>
        </>
    )
}
export default Grid;