import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import new_api from "./new_api/new_api";
import api from "./scripts/api/api";

export function useMapQuery(){
    const {map_name, project_name} = useParams()
    return useQuery(['map', {map_name, project_name}], new_api.maps.get)
}
export function useSeatsQuery(){
    const {map_name, project_name} = useParams()
    return useQuery(['seats', {map_name, project_name}], new_api.seats.get_all)
}
export function useBelogsQuery(){
    const {project_name} = useParams()
    return useQuery(['belongs', {project_name}], new_api.seat_belongs.get_all)
}
export function useGuestsQuery(){
    const {project_name} = useParams()
    return useQuery(['guests', {project_name}], new_api.guests.get_all)
}
export function useTagsQuery(){
    const {project_name} = useParams()
    return useQuery(['tags', {project_name}], new_api.tags.get_all)
}
export function useTagsBelongsQuery(){
    const {map_name, project_name} = useParams()
    return useQuery(['tags_belongs', {map_name, project_name}], new_api.tag_belongs.get_all)
}
export function useRequestsQuery(){
    const {project_name} = useParams()
    return useQuery(['requests', {project_name}], new_api.requests_belongs.get_all)
}
export function useElementsQuery(){
    const {map_name} = useParams()
    return useQuery(['elements', {map_name}], new_api.map_elements.get_all)
}
export function useMapsQuery(){
    const {project_name} = useParams()
    return useQuery(['maps', {project_name}], new_api.maps.get_all)
}
export function useProjects(){
    return useQuery(['projects'], new_api.projects.get)
}