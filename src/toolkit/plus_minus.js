import { useState } from "react"
import Quantity from "./quantity";

let Btn = () => {
    const [count, setcount] = useState(0)
    // console.log(count,'count');
    return(
        <div>
            <div style={{backgroundColor:"powderblue",padding:'8px 15px'}}>
                <button onClick={() => setcount(count - 1)} style={{backgroundColor:'transparent',border:'none',fontSize:'20px'}}>-</button>
                <span type='text' style={{margin:'0 8px 0 8px'}}>{count}</span>
                <button onClick={() => setcount(count + 1)} style={{backgroundColor:'transparent',border:'none',fontSize:'20px'}}>+</button>
            </div>
            <div style={{display:'none'}}><Quantity count={count}/></div>
            {/* <Quantity count={count}/> */}
        </div>
    )
}
export default Btn;