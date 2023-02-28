import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSocket } from "../app";
import new_api from "../new_api/new_api";

export function useMapsAllData(){
    const {project_name} = useParams()
    return useQuery(['maps', {project_name}], new_api.maps.get_all)
}
export function useMapsData(){
    const {map_name, project_name} = useParams()
    return useQuery(['map', {map_name, project_name}], new_api.maps.get)
}
export function useMapsCreate(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(({name, rows, cols}) =>{
        return new_api.maps.create(name, rows, cols, project_name)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['maps', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}