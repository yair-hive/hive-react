import { useContext } from 'react';
import { EditContext } from '../pages/maps';
import '../style/row_col_selector.css'

function RowColSelector(props) {
    const edit = useContext(EditContext)

    if(edit === 'ערוך'){
        var style
        if(props.number === 0) style = {opacity: 0}
        return ( 
            <div className="selector_cont" style={style}>
                <div className="row_col_selector hive_button">
                    {props.number}
                </div>
            </div>
        );
    }
}

export default RowColSelector;