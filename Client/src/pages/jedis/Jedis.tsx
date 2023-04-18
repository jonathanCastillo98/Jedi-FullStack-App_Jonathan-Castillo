import { useCallback, useEffect, useState } from "react"
import JediCard from "./components/JediCard/JediCard";

import Button from '@mui/material/Button';
import { ModalCreate } from "../../components/modalCreate";


const Jedis = () => {

    const [jedisList, setJedisList] = useState<any>();
    const [isModalActive, setIsModalActive] = useState(false);

    const getJedisList = async () => {
        const req = await fetch('http://localhost:3000/api/v1/Jedis/');
        const res = await req.json();
        setJedisList(res.success)
        console.log(res.success)
    }

    const getList = useCallback(() => {
        getJedisList().catch(console.error);
    }, [])


    useEffect(() => {

        getList()
    }, [getList])

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
            <ModalCreate isModalActive={isModalActive} handleOnClick={handleOnClose} setIsModalActive={setIsModalActive} onRefresh={getList} />

        </>
    )
}
export default Jedis