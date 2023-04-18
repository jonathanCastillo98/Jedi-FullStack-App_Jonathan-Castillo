import { useEffect, useState } from "react"
import JediCard from "./components/JediCard/JediCard";
import { ModalLocal } from "../../components/modal";

import Button from '@mui/material/Button';


const Jedis = () => {

    const [jedisList, setJedisList] = useState<any>();
    const [isModalActive, setIsModalActive] = useState(false);

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

    const handleOnCreateBttn = (e: any) => {
        e.preventDefault();
        setIsModalActive(true)
    }

    const handleOnClose = (e: any) => {
        e.preventDefault();
        setIsModalActive(false)
    }
    return (
        <>
            <div>Jedis</div>
            <div>
                {jediList}
            </div>
            <Button onClick={handleOnCreateBttn} style={{ color: "black", border: "1px solid black", width: "30vw" }}>Create a Jedi</Button>
            <ModalLocal isModalActive={isModalActive} handleOnClick={handleOnClose} />

        </>
    )
}
export default Jedis