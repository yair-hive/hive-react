import '../style/pop_up.css'
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

function PopUp(props){
    function closePopUp(){
        props.setState(false)
    }
    useEffect(()=>{
        function onkeydown(event){
            if(event.code == 'Escape') closePopUp()
        }
        document.addEventListener('keydown', onkeydown)
        return ()=> document.removeEventListener('keydown', onkeydown)
    },[])
    if(props.status) return (
        ReactDOM.createPortal(<>
        <div className="blur" onClick={closePopUp}></div>                
        <div className='pop_up'>
            <div className='pop_up_head'>
                <div className='X_button' onClick={closePopUp}> X </div>
                <span className='title'>{props.title}</span>
                </div>
            <div className='pop_up_body'>{props.children}</div>
        </div>
        </>, 
            document.getElementById('pop_ups'))
        )
    return null
}

export default PopUp