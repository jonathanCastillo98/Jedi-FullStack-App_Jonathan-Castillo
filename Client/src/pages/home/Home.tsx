import { useLocation, useNavigate } from "react-router-dom";
import './index.css'

const Home = () => {

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toJedisPage = location.pathname && `/Jedis`;


    // Handlers
    const handleOnClick = () => {
        navigate(toJedisPage, { replace: true });
    }

    return (
        <div>
            <h1 className="TitlePrincipal">May the force be with You!</h1>
            <button onClick={handleOnClick}>Let's begin</button>
        </div>
    )
}
export default Home