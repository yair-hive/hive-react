import { useContext } from 'react'
import { MBloaderContext } from '../app'
import '../style/MBloader.css'

function MBloader(){

    const [status, setStatus] = useContext(MBloaderContext)

    if(status){
        return(
            <div className='MBloader-container'>
                <div className='loader-box'>
                    <span className="loader"></span>
                </div>
            </div>
        )
    }
}

export default MBloader