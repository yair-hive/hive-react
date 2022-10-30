exports.get_map = function(map_name){
    const options = {
        method: 'POST',
        body: "action=get_map&map_name="+map_name,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
      
    return fetch('http://localhost/hive-php/api.php', options)
    .then((response) => {
        return response.json();
    })
}