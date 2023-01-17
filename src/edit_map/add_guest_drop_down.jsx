import DropDown from "../hive_elements/dropDown"

function AddGuestDropDown(props){
    return (
        <DropDown status={props.status} pos={props.pos}></DropDown>
    )
}

export default AddGuestDropDown