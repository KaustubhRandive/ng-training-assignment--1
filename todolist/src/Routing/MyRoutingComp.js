
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashBord from "../crud/DashBord";


import EditTask from "../crud/EditTask";
import AddTask from "../crud/AddTask";
const MyRoutingComp = () => {
    return (
        <div className='container'>
            <BrowserRouter>

                

                        <Routes>
                            {/* default Routing */}
                            <Route path="/" element={<DashBord />}></Route>
                            <Route path="dashbord" element={<DashBord />}></Route>
                            <Route path="addtask" element={<AddTask />}></Route>
                            <Route path="edittask/:id" element={<EditTask />}></Route>


                        </Routes>

                        
                    
              


            </BrowserRouter>


        </div>


    )
}
export default MyRoutingComp;