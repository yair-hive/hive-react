import './Nav_bar.css'
import { Link } from "react-router-dom";

function Nav_bar(){
    return( 
        <div className='nav_bar'>
            <div className='logo'> 
                <Link to='/'> hive </Link> 
            </div>
            <ul className='links'>
                <li>
                    <Link to='maps'>
                        maps
                    </Link>
                </li>
                <li>
                    <Link to='login'>
                        login
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav_bar