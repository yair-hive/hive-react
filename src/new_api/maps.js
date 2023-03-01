import hiveFetch from "./hiveFetch";

const maps = {}
maps.update = {}

maps['create'] = function(map_name, rows, cols, project_name){
    const body = {
        category: 'maps',
        action: 'create',
        map_name, rows, cols, project_name
    }
    return hiveFetch(body)
};
maps['get_all'] = function({queryKey}){
    const {project_name} = queryKey[1]
    const body = {
        category: 'maps',
        action: 'get_all',
        project_name
    }
    return hiveFetch(body)
};
maps['get'] = function({queryKey}){
    const {map_name, project_name} = queryKey[1]
    const body = {
        category: 'maps',
        action: 'get',
        map_name, project_name
    }
    return hiveFetch(body)
};
maps['update']['cols_to'] = function(map_name, project_name, to){
    const body = {
        category: 'maps',
        action: 'update',
        fild: 'cols_to',
        map_name, project_name, to
    }
    return hiveFetch(body)
};

export default maps