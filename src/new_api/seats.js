import hiveFetch from "./hiveFetch";

const seats = {}
seats['update'] ={}

seats['create'] = function(map_name, project_name, data){
    const body = {
        category: 'seats',
        action: 'create',
        map_name, project_name, data
    }
    return hiveFetch(body)
};
seats['get_all'] = function({queryKey}){
    const {map_name, project_name} = queryKey[1]
    const body = {
        category: 'seats',
        action: 'get_all',
        map_name, project_name
    }
    return hiveFetch(body)
};
seats['delete'] = function(seats_ids){
    const body = {
        category: 'seats',
        action: 'delete',
        seats_ids
    }
    return hiveFetch(body)
};
seats['update']['numbers'] = function(seats_numbers){
    const body = {
        category: 'seats',
        action: 'update',
        fild: 'numbers',
        seats_numbers
    }
    return hiveFetch(body)
};

export default seats