import { Route, Routes, useParams } from "react-router-dom"

function TestName(){

    const {name} = useParams()

    return(
        <h1> ברוך הבא {name} </h1>
    )
}
function Test(){
    return (
        <Routes>
            <Route path="/name" element={<TestName />}/>
            <Route path="/" element={<h1> הבא </h1>}/>
        </Routes>
    )
}

export default Test