import '../style/prompt.css'
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { useHive } from '../app';

function Prompt(props){

    const Hive = useHive()
    const [InputValue, setInputValue] = useState(null)

    function closePopUp(){
        if(props.id) Hive.closePopUp(props.id)
        else props.setState(false)
    }

    function onkeydown(event){
        if(event.code == 'Escape') closePopUp()
    }

    function onOk(){
        props.setValue(InputValue)
        Hive.closePopUp(props.id)
    }

    function onCancale(){
        Hive.closePopUp(props.id)
    }

    useEffect(()=>{
        document.addEventListener('keydown', onkeydown)
        return ()=> document.removeEventListener('keydown', onkeydown)
    },[])
    if(props.status || Hive.pop_ups[props.id]) return (
        ReactDOM.createPortal(<>
        <div className="blur" onClick={closePopUp}></div>                
        <div className='prompt hive_but'>
            <div className='prompt_head hive_but'>
                <span className='title'>{props.title}</span>
                </div>
            <div className='prompt_body hive_but'>
                <input className = "hive_but" onChange={(e)=> setInputValue(e.target.value)}/>
                <div className='prompt_buttons hive_but'>
                    <div className='hive_but prompt_button ok_button' onClick={onOk}><span> אישור </span></div>
                    <div className='hive_but prompt_button cancale_button' onClick={onCancale}><span> ביטול </span></div>
                </div>
            </div>
        </div>
        </>, 
            document.getElementById('pop_ups'))
        )
    return null
}

export default Prompt