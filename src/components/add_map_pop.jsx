import HiveButton from "../hive_elements/hive_button"
import PopUp from "../hive_elements/pop_up"

function AddMapPop(props){
    return(
        <PopUp
        status={props.status} 
        setState = {props.setState}
        title = 'הוסף מפה'
        >
            <form id='create_map_form'>
                <label htmlFor="map_name"> שם המפה </label>
                <br />
                <input type='text' name='map_name' />  
                <br />
                <label htmlFor="rows_number"> מספר שורות </label>
                <br />
                <input type='text' name='rows_number' />
                <br />
                <label htmlFor="columns_number"> מספר טורים </label>
                <br />
                <input type='text' name='columns_number' /> 
                <br /> 
                <HiveButton> צור </HiveButton>
            </form>
        </PopUp>
    )
}

export default AddMapPop