import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSocket } from "./app";
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
    
    const mutation = useMutation(({guest_id, seat_id}) => {
        return api.guest_new.create_belong(guest_id, seat_id, map_name)
        .then(async (res)=> {
            if(res.msg === 'exists'){
                if(window.confirm('המשתמש כבר משובץ האם אתה רוצה לשבץ מחדש?')){
                    await api.guest_new.update_belong(guest_id, seat_id, map_name)
                    .then((res)=>{
                        // var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_belongs', map_name]})
                        // hiveSocket.send(msg)
                    })
                }
            }else{
                // var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_belongs', map_name]})
                // hiveSocket.send(msg)
            }
        })
    }, {
        onSuccess: (data, variables)=>{
            console.log(data)
            console.log(variables)
            queryClient.invalidateQueries(['seat_belongs', map_name])
        }
    })
    return mutation
}