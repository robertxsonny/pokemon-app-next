import React, { useEffect, useState } from 'react';
import { useMyPokemons } from '../hooks/my-pokemon';
import Modal from './Modal';

const CatchPokemon = ({ open, name, onCaught, onClose }) => {
  const { hasPokemonWithNickname, catchPokemon } = useMyPokemons();
  const [nickname, setNickname] = useState();
  const [canCatch, setCanCatch] = useState(null);

  useEffect(() => {
    if (open) {
      setCanCatch(null);
      setTimeout(() => {
        setCanCatch(Math.random() < 0.5);
      }, 3000)
    }
  }, [open])

  const onNicknameChange = (event) => {
    const { value } = event.target;
    setNickname(value);
  }

  const onCatchPokemon = () => {
    catchPokemon(name, nickname);
    onClose();
    if (onCaught) {
      onCaught();
    }
  }

  return (
    <Modal open={open}>
      {canCatch === false && (
        <>
          <p>Oops, failed to catch {name}!</p>
          <button onClick={onClose}>Go back</button>
        </>
      )}
      {canCatch === true && (
        <>
          <p>{name} caught! Give it a unique nickname to save it to your collection</p>
          <input value={nickname} onChange={onNicknameChange} />
          <button disabled={!nickname || hasPokemonWithNickname(nickname)} onClick={onCatchPokemon}>Save to my collection</button>
        </>
      )}
      {canCatch === null && (
        <p>Trying to catch {name}, please wait...</p>
      )}
    </Modal>
  )
}

export default CatchPokemon;
