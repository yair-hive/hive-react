const api_url = 'http://localhost/hive-php/api.php'

exports.get_map = function(map_name){
    const options = {
        method: 'POST',
        body: "action=get_map&map_name="+map_name,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch(api_url, options)
    .then((response) => {
        return response.json();
    })
}
exports.get_seat = function(map_name){
    const options = {
        method: 'POST',
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
        body: "action=get_maps",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch(api_url, options)
    .then((response) => {
        return response.json();
    })
}