const api_url = "http://hive.com/api/index.php"

const global_options = {
    method: 'POST',
    credentials: 'include',            
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
};

export const guest_new = {
    get_all: async ({queryKey})=>{
        const options = {...global_options}
        var action_params = {
            category: 'guest', 
            action: 'get_all', 
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
        options.body = `category=guest&action=get_belongs&map_name=${queryKey[1]}`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    }
}
