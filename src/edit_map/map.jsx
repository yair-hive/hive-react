import Cell from './cell'
import Seat from './seat'

function Map(props){
    const  map_res  = props.map_res
    const seats_res = props.seats_res
    const belongs_res = props.belongs_res 
    const guests_res = props.guests_res
    const guests_groups_res = props.guests_groups_res

    const create_cells = function(){
        // console.log(guests_res.data)
        if(belongs_res.data){
            var new_belongs = {}
            belongs_res.data.map(bel => {
                new_belongs[bel.seat] = bel
                return bel
            })
            var cells = []
            var key = 0
            for(var rowsCounter = 1; rowsCounter <= map_res.data.rows_number; rowsCounter++){
                for(var colsCounter = 1; colsCounter <= map_res.data.columns_number; colsCounter++){
                    if(seats_res.data.length > 0){
                        for(let seat of seats_res.data){
                            if(seat.row_num == rowsCounter && seat.col_num == colsCounter){
                                var guest = null
                                if(new_belongs[seat.id]) guest = new_belongs[seat.id].guest
                                cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: {seat_number: seat.seat_number, belong: guest}}
                                break;
                            }else{
                                cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                            }
                        }
                    }else{
                        cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                    }
                    key++          
                }                         
            }
            // console.log(map_res.data)
            // console.log(seats_res.data)
            // console.log(cells)
            return cells
        }
    }

    if(map_res.data && seats_res.data && belongs_res.data && guests_res.data && guests_groups_res.data){
        return (
        <div id="map" className="map" style={{'--map-rows' : map_res.data.rows_number, '--map-cols' : map_res.data.columns_number}}> 
            {create_cells().map(cell => {
                var new_guests = {} 
                guests_res.data.map(gue => {
                    new_guests[gue.id] = gue
                    return gue
                })
                var new_groups = {}
                guests_groups_res.data.map(group => {
                    new_groups[group.id] = group
                    return group
                })
                // console.log(new_groups)
                if(cell.seat){
                    var guest_name = null
                    var color = null
                    if(cell.seat.belong) {
                        var guest = new_guests[cell.seat.belong]
                        if(guest){
                            guest_name = guest.last_name + ' ' + guest.first_name
                            if(guest.guest_group) color = new_groups[guest.guest_group].color
                        }
                    }
                    // console.log(guest_name)
                    return <Seat key={cell.key} number={cell.seat.seat_number} name={guest_name} color = {color}/>
                }else{
                    return <Cell 
                        row_number={cell.row} 
                        col_number={cell.col} 
                        key={cell.key} 
                        index={cell.key} 
                        selectable={true}
                    />
                }                  
            })} 
        </div>)
    }
    return 'loading ...'
}

export default Map