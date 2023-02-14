import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { MBloaderContext, useSocket } from "./app";
import { map_add } from "./edit_map/map_add";
import api from "./scripts/api/api";

export function useMapAdd(){

    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()

    const mutations = {   
        seats: useMutation(seats => {
            seats = JSON.stringify(seats)
            return api.seat_new.create_multiple(map_name, seats)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['seats', map_name]})
                hiveSocket.send(msg)
    
            }
        }),       
        tags: useMutation(({seats, tag_name}) => {
            seats = JSON.stringify(seats)
            return api.tag_new.add_multiple(seats, tag_name, map_name)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['tags', map_name])
                queryClient.invalidateQueries(['tags_belongs', map_name])
            }
        }),        
        numbers: useMutation(({data}) => {
            data = JSON.stringify(data)
            return api.seat_new.create_multiple_numbers(data)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['seats', map_name])
            }
        }),       
        elements: useMutation(({data}) => {
            const {name, from_row, from_col, to_row, to_col} = data
            return api.elements.add(name, from_row, from_col, to_row, to_col, map_name)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['elements', map_name])
            }
        })
    }
    return  function(action){
        console.log(action)
        return mutations[action].mutate(map_add[action]())
    }
}

export function useMapDelete(){

    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()

    const mutations = {   
        seats: useMutation(seats => {
            seats = JSON.stringify(seats)
            return api.seat_new.create_multiple(map_name, seats)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['seats', map_name]})
                hiveSocket.send(msg)
    
            }
        }),       
        tags: useMutation(({seats, tag_name}) => {
            seats = JSON.stringify(seats)
            return api.tag_new.add_multiple(seats, tag_name, map_name)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['tags', map_name])
                queryClient.invalidateQueries(['tags_belongs', map_name])
            }
        }),        
        numbers: useMutation(({data}) => {
            data = JSON.stringify(data)
            return api.seat_new.create_multiple_numbers(data)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['seats', map_name])
            }
        }),       
        elements: useMutation(({data}) => {
            const {name, from_row, from_col, to_row, to_col} = data
            return api.elements.add(name, from_row, from_col, to_row, to_col, map_name)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['elements', map_name])
            }
        })
    }
    return  function(action){
        console.log(action)
        return mutations[action].mutate(map_add[action]())
    }
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