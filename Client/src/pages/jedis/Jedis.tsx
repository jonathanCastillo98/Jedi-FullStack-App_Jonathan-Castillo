import './index.css'

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
            onRefresh={getList}

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
            <div className='Container'>
                <h1 className='jediTitle'>This is our army!</h1>
                <header>
                    <Button
                        className='AddJedi'
                        style={{ fontSize: "1.1rem", backgroundColor: "#ff2301", color: "#fff6a9", boxShadow: "0 0 20px #ff2301,  0 0 20px #ff2301", fontFamily: "Open sans" }}
                        onClick={handleOnCreateBttn}>
                        Create a Jedi
                    </Button>
                </header>
                {jediList ? <main>
                    <div className='ListItemsHeader'>
                        <p>Name</p>
                        <p>Saber Color</p>
                        <p>Battle Style</p>
                        <p>Apprentice</p>
                        <p>Update / Delete</p>
                    </div>
                    {jediList && <div>{jediList}</div>}
                </main> :
                    <h1>Empty List</h1>
                }
            </div>
            <ModalCreate isModalActive={isModalActive} handleOnClick={handleOnClose} setIsModalActive={setIsModalActive} onRefresh={getList} />

        </>
    )
}
export default Jedis