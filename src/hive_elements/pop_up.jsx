import '../style/pop_up.css'
import ReactDOM from 'react-dom';

function PopUp(props){
    function closePopUp(){
        props.setState(false)
    }
    if(props.status) return (
        ReactDOM.createPortal(
            <div className="blur" onClick={closePopUp}>
                <div className='pop_up'>
                    <div className='pop_up_head'>{props.title}</div>
                    <div className='pop_up_body'>{props.children}</div>
                </div>
            </div>, 
            document.getElementById('pop_ups'))
        )
    return null
}

export default PopUp