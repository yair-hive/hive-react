import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { MBloaderContext, useSocket } from "./app";
import api from "./scripts/api/api";

export function useAddSeats(){
    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()

    const mutation = useMutation(seats => {
        seats = JSON.stringify(seats)
        return api.seat_new.create_multiple(map_name, seats)
    }, {
        onSuccess: (data, variables)=>{
            console.log(data)
            console.log(variables)
            queryClient.setQueryData(["seats", map_name], old =>{
                console.log(old)
                // old.push(...variables)
            })
            queryClient.invalidateQueries(['seats', map_name])
        }
    })
    return mutation
}
export function useAddGuest(){
    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(async ({guest_id, seat_id}) => {
        const res = await api.guest_new.create_belong(guest_id, seat_id, map_name);
        if (res.msg === 'exists') {
            if (window.confirm('המשתמש כבר משובץ האם אתה רוצה לשבץ מחדש?')) {
                await api.guest_new.update_belong(guest_id, seat_id, map_name);
            }
        }
    }, {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['seat_belongs', map_name])
        }
    })
    return mutation
}
export function useAddTags(){
    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(({seats, tag_name}) => {
        seats = JSON.stringify(seats)
        return api.tag_new.add_multiple(seats, tag_name, map_name)
    }, {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['tags', map_name])
            queryClient.invalidateQueries(['tags_belongs', map_name])
        }
    })
    return mutation
}
export function useAddNumbers(){
    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(({data}) => {
        data = JSON.stringify(data)
        return api.seat_new.create_multiple_numbers(data)
    }, {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['seats', map_name])
        }
    })
    return mutation
}
export function useScheduling(){

    const [MBloaderStatus, setMBloaderStatus] = useContext(MBloaderContext)

    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(() => {
        return fetch(`http://localhost:3020/actions/scheduling/${map_name}`, {method: 'GET'})
    }, {
        onMutate: ()=>{
            setMBloaderStatus(true)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['seat_belongs', map_name])
            setMBloaderStatus(false)
        }
    })
    return mutation
}