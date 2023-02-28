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
            project: queryKey[1]
        }
        options.body = JSON.stringify(action_params)
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    get_belongs: async ({queryKey})=>{
        const options = {...global_options}
        options.body = `category=guest&action=get_belongs&project=${queryKey[1]}`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    create_belong: async (guest_id, seat_id, map_name)=>{
        const options = {...global_options}
        options.body = "category=guest&action=add&guest_id="+guest_id+"&seat_id="+seat_id+"&map_name="+map_name
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        // if (json_res.msg != 'ok') throw new Error(json_res.msg);
        return json_res
    },
    update_belong: async (guest_id, seat_id, map_name)=>{
        const options = {...global_options}
        options.body = "category=guest&action=update_belong&guest_id="+guest_id+"&seat_id="+seat_id+"&map_name="+map_name
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data
    },
    create_multi: async ({project_name, guests})=>{
        const options = {...global_options}
        var action_params = {
            category: 'guest', 
            action: 'create_multi',
            project: project_name,
            guests: guests
        }
        options.body = JSON.stringify(action_params)  
        const res = await fetch(api_url, options);
        const res_text = await res.text();
        return console.log(res_text);
    },
}
