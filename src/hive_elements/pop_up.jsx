import '../style/pop_up.css'
import ReactDOM from 'react-dom';

function PopUp(props){
    function closePopUp(){
        props.setState(false)
    }
    if(props.status) return (
        ReactDOM.createPortal(<>
        <div className="blur" onClick={closePopUp}></div>                
        <div className='pop_up'>
            <div className='pop_up_head'>
                <div className='X_button' onClick={closePopUp}> X </div>
                {props.title}
                </div>
            <div className='pop_up_body'>{props.children}</div>
        </div>
        </>, 
            document.getElementById('pop_ups'))
        )
    return null
}

export default PopUp