const api_url = "http://localhost/api/index.php"

export const map_elements_new = {
    add: (name, from_row, from_col, to_row, to_col, map_name)=>{
        const options = {
            method: 'POST',
            credentials: 'include',
            body: "category=map_element&action=add&map_name="+map_name+"&name="+name+"&from_row="+from_row+"&from_col="+from_col+"&to_row="+to_row+"&to_col="+to_col,
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
    delete_multiple: (elements_ids)=>{
        const options = {
            method: 'POST',
            credentials: 'include',
            body: "category=map_element&action=delete_multiple&elements_ids="+elements_ids,
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