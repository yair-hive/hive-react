import api from "../scripts/api/api"

export default function(){
    const on = function(){
        var user_form = document.getElementById('user_form')
        var user_form_data = new FormData(user_form)
        const formDataObj = {};
        user_form_data.forEach((value, key) => (formDataObj[key] = value));
        api.user.login(formDataObj)
        .then(json => alert(json.msg))
    }
    return(
        <form id="user_form"> 
            <label htmlFor="user_name"> user name </label>
                <input type='text' name='user_name' />  
                <br />           
                <label htmlFor="password"> password </label>
                <input type='text' name='password' />
                <br /> 
                {console.log(api.user.get())}
                <div id="login_button" className="hive-button" onClick={on}> התחבר </div>
        </form>
    )
}