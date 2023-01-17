const parsedUrl = new URL(window.location.href)
const api_url = "http://"+parsedUrl.hostname+'/hive-php/php/api.php'

exports.get_map = function(map_name){
    const options = {
        method: 'POST',
        credentials: 'include',
        body: "category=map&action=get&map_name="+map_name,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch(api_url, options)
    // .then(res => res.text())
    // .then(res => alert(res))
    .then(res => res.json())
    .then((res)=>{
        if(res.msg === 'ok') return res.data[0]
        alert(res.msg)
        return res.msg
    })
}
exports.get_seat = function(map_name){
    const options = {
        method: 'POST',
        credentials: 'include',
        body: "action=get_seats&map_name="+map_name,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch(api_url, options)
    .then((response) => {
        return response.json();
    })
}

exports.get_guests = function(){
    const options = {
        method: 'POST',
        credentials: 'include',
        body: "action=get_guests_names",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch(api_url, options)
    .then((response) => {
        return response.json();
    })
}
exports.get_belongs = function(map_name){
    const options = {
        method: 'POST',
        credentials: 'include',
        body: "action=get_guest_seat_num&map_name="+map_name,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch(api_url, options)
    .then((response) => {
        return response.json();
    })
}
exports.get_maps = ()=>{
        const options = {
            method: 'POST',
            credentials: 'include',
            body: "category=map&action=get_all",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        };         
        return fetch(api_url, options)
        .then(res => res.json())
        .then(res => {
            if(res.msg) return res.data
            alert(res.msg)
        })
}