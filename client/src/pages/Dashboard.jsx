import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';
import DashPost from "../Components/DashPost";
import DashUser from "../Components/DashUser";
import DashComment from "../Components/DashComment";
import DashboardComp from "../Components/DashboardComp";

const Dashboard = () => {
    const location = useLocation();
    const [tab,setTab] = useState('');
    useEffect( () => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
       if(tabFromUrl){
         setTab(tabFromUrl);
       }
    },[location.search]);
    return(
        <div className="min-h-screen flex flex-col md:flex-row ">
            {/* sidebar */}
            <div className="md:w-56">
                <DashSidebar/>
            </div>

            {/* right side of profile */}

            <div>
                {tab === 'profile'&& <DashProfile/>}
            </div>

        {/* posts */}
        {tab==='posts' && <DashPost/>}

        {/* users */}
        {tab==='users' && <DashUser/>}

        {/* Comment */}
        {tab === 'comments' && <DashComment/>}

        {/* dashboard sidebar */}
        {tab === 'dash' && <DashboardComp/>}
        </div>
    )
}

export default Dashboard;