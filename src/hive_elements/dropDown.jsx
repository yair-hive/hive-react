import { useEffect } from 'react'
import { useState } from 'react'
import '../style/drop_down.css'

function DropDown(props){

    const [style, setStyle] = useState(null)

    function offsetCalculate(){
        console.log('ggs')
        if(props.pos){
            var parent = props.pos.getBoundingClientRect()
            var parent_width = parent.width
            var list_width_over = 60
            var list_width_over_d = list_width_over / 2
            var drop_down_top = parent.bottom
            var drop_down_width = parent_width + list_width_over
            var drop_down_left = parent.left - list_width_over_d 
            
            setStyle({
                width : drop_down_width+'px',
                top : drop_down_top+'px',
                left : drop_down_left+'px'
            })
        }
    }

    useEffect(()=>{
        offsetCalculate()
    }, [props.pos])
    

    useEffect(()=>{
        if(props.pos){
            document.addEventListener('resize', offsetCalculate)
            return ()=> document.removeEventListener('resize', offsetCalculate)
        }
    }, [])

    useEffect(()=>{
        var main_bord = document.getElementById('main_bord')
        if(props.pos){
            main_bord.addEventListener('scroll', offsetCalculate)
            return ()=> main_bord.removeEventListener('scroll', offsetCalculate)
        }
    }, [])

    if(!props.status) return

    return (<div className="drop_down" style={style}></div>)

}

export default DropDown