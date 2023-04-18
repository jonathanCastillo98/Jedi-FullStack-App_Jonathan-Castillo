import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { useForm } from 'react-hook-form';

import './indexUpdate.css';
import { useEffect, useState } from 'react';

type Props = {
  isModalActive: boolean,
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
  onRefresh: () => void,
  name: string,
  battleStyle: number,
  isApprentice: boolean,
  saberColor: string,
  id: number

}

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute' as 'absolute',
  padding: '4.5rem 2.5rem 2.5rem',
  borderRadius: '1.5rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  backgroundColor: "black",
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalUpdate = ({ isModalActive, setIsModalActive, onRefresh, name, saberColor, isApprentice, battleStyle, id }: Props) => {

  const [inputs, setInputs] = useState({
    name: name,
    lightSaberColor: saberColor,
    battleStyle: battleStyle,
    isApprentice: isApprentice
  });

  useEffect(() => {

    const createJedi = async (name: string, lightSaberColor: string, battleStyle: number, isApprentice: boolean) => {
      let data = {
        name: name,
        lightSaberColor: lightSaberColor,
        battleStyle: battleStyle,
        isApprentice: isApprentice
      }

      try {
        const req = await fetch(`http://localhost:3000/api/v1/Jedis/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const res = await req.json();
        onRefresh();
      } catch (error) {
        console.error(error)
      }

    }

    createJedi(inputs.name, inputs.lightSaberColor, inputs.battleStyle, inputs.isApprentice)
  }, [inputs])

  // Stuff to control the form
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: name, lightSaberColor: saberColor, battleStyle: battleStyle, isApprentice: isApprentice } });

  const handleFormSubmit = (e: any) => {
    console.log(e)

    setInputs({
      name: e.name,
      lightSaberColor: e.lightSaberColor,
      battleStyle: e.battleStyle,
      isApprentice: e.isApprentice
    })

    setIsModalActive(false)
  };

  const handleOnClick = () => {
    setIsModalActive(false)
  }

  return (
    <>
      <Modal
        open={isModalActive}
        onClose={handleOnClick}
      >
        <Box sx={{ ...style, width: "80vw", height: "80vh" }}>

          <i className="uil uil-times services__modal-close" onClick={handleOnClick}></i>
          <h3 className="services__modal-title">Update Jedi</h3>

          <div className="WrapperFormSignIn">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="Input-boxSignIn">
                <label htmlFor="name">Name</label><br />
                <input type="text" {...register('name', { required: true })} />
                {errors.name?.type === 'required' && <p className='alert' role="alert">Name is required!</p>}
              </div>
              <div className="Input-boxSignIn">
                <label htmlFor="lightSaberColor">Light Saber Color</label><br />
                <select className='selector' {...register("lightSaberColor")}>
                  <option value="blue">blue</option>
                  <option value="yellow">yellow</option>
                  <option value="green">green</option>
                  <option value="purple">purple</option>
                  <option value="orange">orange</option>
                  <option value="red">red</option>
                </select>
              </div>
              <div className="Input-boxSignIn">
                <label htmlFor="battleStyle">Battle Style</label><br />
                <select className='selector' {...register("battleStyle")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </div>
              <div className="Input-boxSignIn check">
                <label htmlFor="battleStyle">Apprentice</label><br />
                <input className='checkbox' type="checkbox" {...register('isApprentice')} />
              </div>
              <button type="submit">Update</button>
              <button onClick={(e) => { e.preventDefault() }}>Cancel</button>
            </form>
          </div>

        </Box>
      </Modal>
    </>
  );
}

export default ModalUpdate;