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

export const map_new = {
    get: async ({queryKey})=>{
        const options = {...global_options}
        const {project_name, map_name} = queryKey[1]
        options.body = `category=map&action=get&project_name=${project_name}&map_name=${map_name}`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data[0];
    },
    get_all: async ({queryKey})=>{
        const options = {...global_options}
        options.body = `category=map&action=get_all_2&project=${queryKey[1]}`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    },
    create: async (project_name, map_name, rows, cols)=>{
        const options = {...global_options}
        const body = {
            category: 'map',
            action: 'create',
            project: project_name,
            map_name: map_name,
            rows: rows,
            cols: cols
        }
        console.log(convertToFormType(body))
        options.body = convertToFormType(body)
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    }
}