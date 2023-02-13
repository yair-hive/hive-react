const api_url = "http://hive.com/api/index.php"

const global_options = {
    method: 'POST',
    credentials: 'include',            
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
};

export const tag_new = {
    add_multiple: async (seats, group, map_name)=>{       
        const options = {...global_options}
        options.body = "category=tag&action=add_multiple_tags&seats="+seats+"&group="+group+"&map_name="+map_name        
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    get_all: async function({queryKey}){
        const options = {...global_options}
        var action_params = {
            category: 'tag', 
            action: 'get_all_tags', 
            map_name: queryKey[1]
        }
        options.body = JSON.stringify(action_params)
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    get_belongs: async ({queryKey})=>{
        const options = {...global_options}
        options.body = "category=tag&action=get_all_belongs&map_name="+queryKey[1]         
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
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