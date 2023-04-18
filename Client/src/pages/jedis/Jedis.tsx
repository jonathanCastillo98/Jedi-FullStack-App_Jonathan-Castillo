import { useEffect, useState } from "react"
import JediCard from "./components/JediCard/JediCard";

const Jedis = () => {

    const [jedisList, setJedisList] = useState<any>();

    useEffect(() => {
        const getJedisList = async () => {
            const req = await fetch('http://localhost:3000/api/v1/Jedis/');
            const res = await req.json();
            setJedisList(res.success)
            console.log(res.success)
        }
        getJedisList()
    }, [])

    const jediList = jedisList?.map((jedi: any) =>
        <JediCard
            key={jedi.id}
            id={jedi.id}
            name={jedi.name}
            saberColor={jedi.lightSaberColor}
            battleStyle={jedi.battleStyle}
            isApprentice={jedi.isApprentice}
        />)
    return (
        <>
            <div>Jedis</div>
            <div>
                {jediList}
            </div>

        </>
    )
}
export default Jedis