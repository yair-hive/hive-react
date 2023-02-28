const api_url = "http://hive.com/api/index.php"

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

export const seat_new = {
    get_all_1: async ({queryKey})=>{
        const options = {method: 'GET'}
        // options.body = `category=seat&action=get_all&map_name=${queryKey[1]}`       
        const res = await fetch("http://localhost:3020/actions/seats_score/"+queryKey[1], options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    },
    get_all: async ({queryKey})=>{
        const {map_name, project_name} = queryKey[1]
        const options = {...global_options}
        const body = {
            category: 'seat',
            action: 'get_all',
            map_name: map_name,
            project_name: project_name
        }
        options.body = convertToFormType(body)         
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    },
    get_belong: async ({queryKey})=>{
        const options = {...global_options}
        options.body = `category=seat&action=get_belong&map_name=${queryKey[1]}`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    },
    create_multiple: async (map_name, data, project)=>{
        const options = {...global_options}
        options.body = "category=seat&action=create_multiple&map_name="+map_name+"&data="+data+"&project="+project
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res;
    },
    create_multiple_numbers: async (data)=>{
        const options = {...global_options}
        options.body = "category=seat&action=add_multiple_numbers&data="+data
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    },
    delete_multiple: async (seats_ids)=>{
        const options = {...global_options}
        options.body = "category=seat&action=delete_multiple&seats_ids="+seats_ids
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    },
}
