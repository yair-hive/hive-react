const api_url = 'http://localhost/hive-php/php/api.php'

export const tags = {
    add_request: function(data){
        var action_data = {category: 'tag', action: 'add_request'}
        var data_a = Object.assign(action_data, data)
        const options = {
            method: 'POST',
            body: JSON.stringify(data_a),
            credentials: 'include',
        }
        return fetch(api_url, options)
        // .then(res => res.text())
        // .then(res => console.log(res))
        .then(res => res.json())
    },
    get_requests: function(data){
        var action_data = {category: 'tag', action: 'get_requests'}
        var data_a = Object.assign(action_data, data)
        const options = {
            method: 'POST',
            body: JSON.stringify(data_a),
            credentials: 'include',
        }
        return fetch(api_url, options)
        // .then(res => res.text())
        // .then(res => console.log(res))
        .then(res => res.json())
    },
    delete_tag: function(data){
        var action_data = {category: 'tag', action: 'delete_tag'}
        var data_a = Object.assign(action_data, data)
        const options = {
            method: 'POST',
            body: JSON.stringify(data_a),
            credentials: 'include',
        }
        return fetch(api_url, options)
        // .then(res => res.text())
        // .then(res => console.log(res))
        .then(res => res.json())
    }
}