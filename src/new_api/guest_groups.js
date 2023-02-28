import hiveFetch from "./hiveFetch";

const guest_groups = {}
guest_groups['update'] = {}

guest_groups['get_all'] = function({queryKey}){
    const {project_name} = queryKey[1]
    const body = {
        category: 'guest_groups',
        action: 'get_all',
        project_name,
    }
    return hiveFetch(body)
};
guest_groups['delete'] = function(group_id){
    const body = {
        category: 'guest_groups',
        action: 'delete',
        group_id,
    }
    return hiveFetch(body)
}; 
guest_groups['update']['name'] = function(group_id, name){
    const body = {
        category: 'guest_groups',
        action: 'update',
        fild: 'name',
        group_id, name,
    }
    return hiveFetch(body)
};
guest_groups['update']['color'] = function(group_id, color){
    const body = {
        category: 'guest_groups',
        action: 'update',
        fild: 'color',
        group_id, color,
    }
    return hiveFetch(body)
};
guest_groups['update']['score'] = function(group_id, score){
    const body = {
        category: 'guest_groups',
        action: 'update',
        fild: 'score',
        group_id, score
    }
    return hiveFetch(body)
};

export default guest_groups