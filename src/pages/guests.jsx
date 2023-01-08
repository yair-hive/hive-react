import { Routes, Route } from "react-router-dom";
import GuestsTable from "../guests_list/guests_table";

function Guests(){
    return(<Routes>
        <Route path="/:map_name" element={<GuestsTable/>}/>
    </Routes>)
}

export default Guests