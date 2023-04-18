import { ModalUpdate } from '../../../../components/modalUpdate';
import './index.css'


import { useState } from 'react';

type Props = {
    id: number,
    name: string,
    saberColor: string,
    isApprentice: boolean,
    battleStyle: number,
    onRefresh: () => void
}

const JediCard = ({ id, name, saberColor, battleStyle, isApprentice, onRefresh }: Props) => {

    const [isModalUpdateActive, setIsModalUpdateActive] = useState(false);

    const handleOnDelete = async () => {
        try {
            await fetch(`http://localhost:3000/api/v1/Jedis/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            onRefresh()
        } catch (error) {
            console.error(error)
        }

    }

    const handleOnUpdate = () => {
        setIsModalUpdateActive(true)
    }
    return (
        <div className='ListContainer'>
            <p>{name}</p>
            <p>{saberColor}</p>
            <p>{battleStyle}</p>
            <p>{isApprentice ? "True" : "False"}</p>
            <p className='icons'>
                <span>
                    <i className='bx bx-refresh' onClick={handleOnUpdate}></i>

                </span>
                <span>
                    <i className='bx bxs-trash-alt' onClick={handleOnDelete} ></i>
                </span>
            </p>
            <ModalUpdate id={id} isModalActive={isModalUpdateActive} setIsModalActive={setIsModalUpdateActive} onRefresh={onRefresh} name={name} saberColor={saberColor} isApprentice={isApprentice} battleStyle={battleStyle} />
        </div>
    )
}
export default JediCard