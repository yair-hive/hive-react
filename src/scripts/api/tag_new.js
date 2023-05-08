const api_url = "http://localhost/api/index.php"

const global_options = {
    method: 'POST',
    credentials: 'include',            
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
};

function convertToFormType(object){
    var as_array = Object.entries(object)
    var strings_array = []
    for(let [key, value] of as_array){
        strings_array.push(`${key}=${value}`)
    }
    return strings_array.join('&')
}

async function hiveFetch(api_url, options, body){
    var local_options = {...options}
    local_options.body = convertToFormType(body)        
    const res = await fetch(api_url, local_options);
    const json_res = await res.json();
    if (json_res.msg != 'ok') throw new Error(json_res.msg);
    else return json_res.data
}

export const tag_new = {
    add_multiple: async (seats, tag_name, map_name, project_name)=>{       
        const body = {
            category: 'tag',
            action: 'add_multiple_tags',
            seats: seats,
            group: tag_name,
            map_name: map_name,
            project_name: project_name
        }
        return await hiveFetch(api_url, global_options, body)
    },
    get_all: async function({queryKey}){
        const body = {
            category: 'tag', 
            action: 'get_all_tags', 
            project_name: queryKey[1]
        }
        return await hiveFetch(api_url, global_options, body)
    },
    get_belongs: async ({queryKey})=>{
        const {map_name, project_name} = queryKey[1]
        const body = {
            category: 'tag', 
            action: 'get_all_belongs', 
            project_name: project_name,
            map_name: map_name
        }       
        return await hiveFetch(api_url, global_options, body)
    },
    get_requests: async ({queryKey})=>{
        const options = {...global_options}
        var action_params = {
            category: 'tag', 
            action: 'get_requests', 
            map_name: queryKey[1]
        }
        options.body = JSON.stringify(action_params)
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    add_request: async function(data){
        var action_params = {category: 'tag', action: 'add_request'}
        var body = Object.assign(action_params, data)
        const options = {...global_options}
        options.body = JSON.stringify(body)
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    delete_request: async function ({request_id}){
        const body = {category: 'tag', action: 'delete_request', request_id: request_id}
        const options = {...global_options}
        options.body = JSON.stringify(body)
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    }
}