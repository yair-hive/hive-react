import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "./scripts/api/api";

export function useMapQuery(){
    const {map_name} = useParams()
    return useQuery(['map', map_name], api.map_new.get)
}
export function useSeatsQuery(){
    const {map_name} = useParams()
    return useQuery(['seats', map_name], api.seat_new.get_all)
}
export function useBelogsQuery(){
    const {map_name} = useParams()
    return useQuery(['belongs', map_name], api.seat_new.get_belong)
}
export function useSeatBelogsQuery(){
    const {map_name} = useParams()
    return useQuery(['seat_belongs', map_name], api.seat_new.get_belong)
}
export function useGuestBelogsQuery(){
    const {map_name} = useParams()
    return useQuery(['guest_belongs', map_name], api.guest_new.get_belongs)
}
export function useGuestsQuery(){
    const {project_name} = useParams()
    return useQuery(['guests', project_name], api.guest_new.get_all)
}
export function useGroupsQuery(){
    const {project_name} = useParams()
    return useQuery(['groups', project_name], api.groups.get_all)
}
export function useTagsQuery(){
    const {map_name} = useParams()
    return useQuery(['tags', map_name], api.tag_new.get_all)
}
export function useTagsBelongsQuery(){
    const {map_name} = useParams()
    return useQuery(['tags_belongs', map_name], api.tag_new.get_belongs)
}
export function useRequestsQuery(){
    const {map_name} = useParams()
    return useQuery(['requests', map_name], api.tag_new.get_requests)
}
export function useElementsQuery(){
    const {map_name} = useParams()
    return useQuery(['elements', map_name], api.elements.get)
}
export function useMapsQuery(){
    const {project_name} = useParams()
    return useQuery(['maps', project_name], api.map_new.get_all)
}