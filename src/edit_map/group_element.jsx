import { useContext, useEffect, useRef, useState } from 'react'
import { ActionsContext, EditContext } from '../app'
import '../style/elements.css'

function GroupElement({cell}){

    const [edit, setEdit] = useContext(EditContext)
    const [action, setAction] = useContext(ActionsContext)
    const Pref = useRef(null)
    const [Cstyle, setCstyle] = useState({})

    useEffect(()=> {
        if(action === 'groups' && edit == 'ערוך'){
            var Prect = Pref.current.getBoundingClientRect()
            if(Prect.height > Prect.width) setCstyle({transform: 'rotate(90deg)'})
        }
    },[])

    cell.from_row = Number(cell.from_row)
    cell.from_col = Number(cell.from_col)
    cell.to_row = Number(cell.to_row)
    cell.to_col = Number(cell.to_col)

    var {from_row, from_col, to_row, to_col} = cell

    to_row++
    to_col++

    if(edit == 'ערוך'){
        from_row++
        from_col++
        to_row++
        to_col++
    }

    if(action === 'groups' && edit == 'ערוך'){
        return(
            <div 
                className={`group-element`}
                ref={Pref}
                group_id={cell.id}
                style={{
                    gridRowStart: from_row,
                    gridColumnStart: from_col,
                    gridRowEnd: to_row,
                    gridColumnEnd: to_col,
                    color: 'white'
                }} 
            >
                <div style={Cstyle}>{cell.name}</div>
            </div>
        )
    }
}

export default GroupElement