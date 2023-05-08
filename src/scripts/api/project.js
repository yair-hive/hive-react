const api_url = "http://localhost/api/index.php"

const global_options = {
    method: 'POST',
    credentials: 'include',            
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
};

export const project = {
    create: async (name)=>{
        const options = {...global_options}
        console.log(name)
        options.body = `category=project&action=create&name=${name}`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else alert(json_res.msg);
    },
    get: async ()=>{
        const options = {...global_options}
        options.body = `category=project&action=get`
        const res = await fetch(api_url, options);
        const json_res = await res.json();
        if (json_res.msg != 'ok') throw new Error(json_res.msg);
        else return json_res.data;
    }
}