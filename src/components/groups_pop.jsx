import PopUp from "../hive_elements/pop_up"

function GroupsPop(props){
    return (
    <PopUp
        status={props.status} 
        setState = {props.setState}
        title = 'קבוצות'
    ></PopUp>)
}

export default GroupsPop