import { useState } from "react"
import { useEffect } from "react"

function RolligList(props) {

    const [index, setIndex] = useState(0)

    function onKeyDown(event){
        if(event.code === 'ArrowDown'){
            // if(index < 0) setIndex(0)
            // if(index == 0) return
            setIndex(a => a + 1)
        }
        if(event.code === 'ArrowUp'){
            setIndex(a => {
                if(a != 0) return a - 1
                if(a <= 0) return 0
            })
        }
    }
    useEffect(()=>console.log(index))
    useEffect(()=>{
        document.addEventListener('keydown', onKeyDown)
        return ()=> document.removeEventListener('keydown', onKeyDown)
    }, [])

    function create_list(){
        var list = []
        var i = 0
        for(let item of props.items){
            var className = "rolling_list_item"
            if(i === index) className += " active"
            var li = <li key={i} className={className}> {item} </li>
            list.push(li)
            i++
        }
        return list
    }
    return ( <ul> {create_list()} </ul> );
}

export default RolligList;