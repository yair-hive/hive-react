import { useState } from "react"
import { useEffect } from "react"

function ListItem(props){

    function onMouseOver(){
        props.setIndex(props.index)
    }

    function onMouseOut(){
        props.setIndex(-1)
    }

    return ( 
        <li 
        className={props.className} 
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={props.onItem}
        > 
            {props.item.name} 
        </li>
    )
}

function RolligList(props) {

    const [index, setIndex] = useState(0)

    function onItem(){
        props.onItem(props.items[index])
    }

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
        if(event.code === 'Enter'){
            onItem()
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
            var li = (<ListItem 
                key={i} 
                item={item} 
                className={className} 
                index={i}
                setIndex={setIndex}
                onItem ={onItem}
                />)
            list.push(li)
            i++
        }
        return list
    }
    return ( <ul className="rolling_list"> {create_list()} </ul> );
}

export default RolligList;