import { useEffect } from "react"
import HiveButton from "./hive_button"
import '../style/hive_switch.css'

function HiveSwitch(props){

    function onKeyDown(event){
        if(event.ctrlKey || event.metaKey){
            if(event.code == props.bordKey){
                hiveSwitchMove(props.options, props.active)
            }
        }
    }
    useEffect(()=>{
        document.addEventListener('keydown', onKeyDown)
        return ()=> document.removeEventListener('keydown', onKeyDown)
    })
    function hiveSwitchMove(itemsList, active){
        var length = itemsList.length -1
        var activeIndex = itemsList.indexOf(active)
        var i
        if(activeIndex == length) i = 0
        else i = activeIndex+1
        props.setActive(itemsList[i])
    }
    function create_elements(){
        var i = 0
        var class_name
        return props.options.map(element => {
            var isActive = false
            if(element === props.active) isActive = true
            class_name = 'hive-switch-m'
            if(i === 0) class_name = 'hive-switch-l'
            if(i === (props.options.length -1)) class_name = 'hive-switch-r'
            i++
            return <HiveButton key={i} className={class_name} active={isActive}> {element} </HiveButton>
        })
    }
    return(
        <div className="hive-switch">
            {create_elements()}
        </div>
    )
}

export default HiveSwitch