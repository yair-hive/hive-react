import { useHive } from "../app"
import HiveButton from "../hive_elements/hive_button"

function ActionsDrop({drop, setDrop, ...props}){

    const Hive = useHive()

    if(!drop) return

    return(
        <div className="actions_drop" {...props}>
            <HiveButton onClick={()=> {Hive.openPopUp('login'); setDrop(false)}}> התחבר </HiveButton>
            <HiveButton> התנתק </HiveButton>
            <HiveButton onClick={()=> {Hive.openPopUp('sginup'); setDrop(false)}}> הרשם </HiveButton>
        </div>
    )
}

export default ActionsDrop