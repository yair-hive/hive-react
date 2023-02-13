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
            // queryClient.setQueryData(["seats", map_name], old =>{
            //     console.log(old)
            //     // old.push(...variables)
            // })
            // queryClient.invalidateQueries(['seats', map_name])
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['seats', map_name]})
            hiveSocket.send(msg)

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
        if(res.msg === 'exists') {
            if (window.confirm('המשתמש כבר משובץ האם אתה רוצה לשבץ מחדש?')) {
                await api.guest_new.update_belong(guest_id, seat_id, map_name);
            }
        }
    }, {
        onSuccess: (data, variables,)=>{
            var {guest_id, seat_id} = variables
            queryClient.setQueryData(['belongs', map_name], old => {
                old.forEach((item, index) => {
                    if(item.guest == guest_id) old.splice(index, 1)
                    if(item.seat == seat_id) item.guest = guest_id
                })
                return old
            })
            // queryClient.invalidateQueries(['belongs', map_name])
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['belongs', map_name]})
            hiveSocket.send(msg)
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
        // return fetch(`http://localhost:3020/actions/seats_score/${map_name}`, {method: 'GET'})
        // return fetch(`http://localhost:3020/actions/scheduling/${map_name}`, {method: 'GET'})
    }, {
        onMutate: ()=>{
            setMBloaderStatus(true)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['seat_belongs', map_name])
            // setMBloaderStatus(false)
        }
    })
    return mutation
}
export function useDeleteGuest(){
    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(({guest_id}) => {
        return api.guest.delete(guest_id)
    }, {
        onMutate: (variables)=>{
            queryClient.setQueryData(['guests', map_name], old => {
                old.forEach((guest, index)=>{
                    if(guest.id === variables.guest_id){
                        old.splice(index, 1)
                    }
                })
                return old
            })
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['guests', map_name])
        }
    })
    return mutation   
}