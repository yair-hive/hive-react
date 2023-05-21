const api_url = "http://localhost:3025/api/"
const options = {
    method: 'POST',
    credentials: 'include',            
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
};

function convertToFormType(object){
    var as_array = Object.entries(object)
    var strings_array = []
    for(let [key, value] of as_array){
        strings_array.push(`${key}=${value}`)
    }
    return strings_array.join('&')
}
async function hiveFetch(body){
    var local_options = {...options}
    local_options.body = convertToFormType(body)        
    const res = await fetch(api_url, local_options);
    const json_res = await res.json();
    if (json_res.msg != 'ok') throw new Error(json_res.msg);
    else return json_res.data
}

export default hiveFetch