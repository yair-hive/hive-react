const api_url = "http://hive.com/api/index.php"

export const map_elements_new = {
    add: (name, from_row, from_col, to_row, to_col, map)=>{
        const options = {
            method: 'POST',
            credentials: 'include',
            body: "category=map_element&action=add&map="+map+"&name="+name+"&from_row="+from_row+"&from_col="+from_col+"&to_row="+to_row+"&to_col="+to_col,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        };         
        return fetch(api_url, options)
        // .then(res => res.text())
        // .then(res => alert(res))
        .then(res => res.json())
        .then((res)=>{
            if(res.msg == 'ok') return
            alert(res.msg)
            return res.msg
        })
    },
    get: ({queryKey})=>{
        const options = {
            method: 'POST',
            credentials: 'include',
            body: `category=map_element&action=get&map_name=${queryKey[1]}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        };         
        return fetch(api_url, options)
        // .then(res => res.text())
        // .then(res => alert(res))
        .then(res => res.json())
        .then((res)=>{
            if(res.msg == 'ok') return res.data
            alert(res.msg)
            return res.msg
        })
    },
    delete: (ob_id)=>{
        const options = {
            method: 'POST',
            credentials: 'include',
            body: "category=map_element&action=delete&ob_id="+ob_id,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        };         
        return fetch(api_url, options)
        // .then(res => res.text())
        // .then(res => alert(res))
        .then(res => res.json())
        .then((res)=>{
            if(res.msg == 'ok') return
            alert(res.msg)
            return res.msg
        })
    },
}