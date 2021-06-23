import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import Modal from './Modal';
import { SentenceCase, SmallCtaButton, TextButton } from '../styles/shared';

import { useMyPokemons } from '../hooks/my-pokemon';

const SecondaryTextButton = styled(TextButton)({
  color: 'green',
  marginTop: 12
})

const SecondaryLinkButton = SecondaryTextButton.withComponent('a')

const DangerTextButton = styled(TextButton)({
  color: 'red',
  marginTop: 12
})

const DangerCtaButton = styled(SmallCtaButton)({
  backgroundColor: 'red',
  '&:hover:not([disabled])': {
    backgroundColor: 'firebrick'
  },
  '&:active:not([disabled])': {
    backgroundColor: 'darkred'
  }
})

const TextInput = styled.input({
  marginBottom: 16,
  width: '100%',
  boxSizing: 'border-box',
  padding: '6px 0',
  border: 'none',
  outline: 'none',
  borderBottom: '2px solid dimgray',
  transition: '0.3s all ease',
  textTransform: 'capitalize',
  '&:focus': {
    borderBottom: '2px solid limegreen',
  }
})

const CatchPokemon = ({ open, name, onCaught, onClose }) => {
  const { hasPokemonWithNickname, catchPokemon } = useMyPokemons();
  const [nickname, setNickname] = useState();
  const [canCatch, setCanCatch] = useState(null);
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    const initNickname = () => {
      if (!hasPokemonWithNickname(name)) {
        setNickname(name);
      } else {
        let lastNum = 1;
        while (hasPokemonWithNickname(`${name}${lastNum}`)) {
          lastNum = lastNum + 1;
        }
        setNickname(`${name}${lastNum}`)
      }
    }
  
    if (open && canCatch === null) {
      setCaught(false);
      setTimeout(() => {
        const success = Math.random() < 0.5;
        if (success) {
          initNickname();
        }
        setCanCatch(success);
      }, 3000)
    } else if (!open) {
      setCanCatch(null);
    }
  }, [open, canCatch, hasPokemonWithNickname])

  const onNicknameChange = (event) => {
    const { value } = event.target;
    setNickname(value.toLowerCase());
  }

  const onCatchPokemon = () => {
    catchPokemon(name, nickname);
    setCaught(true);
    if (onCaught) {
      onCaught();
    }
  }

  const nameWihSentenceCase = <SentenceCase>{name}</SentenceCase>

  if (caught) {
    return (
      <Modal open={open} title={<><SentenceCase>{nickname}</SentenceCase> has been added to your collection</>} emoji="✅">
        <Link href="/my-pokemon" passHref>
          <SecondaryLinkButton>View my collection</SecondaryLinkButton>
        </Link>
        <SecondaryTextButton onClick={onClose}>Go back</SecondaryTextButton>
      </Modal>
    )
  }

  if (canCatch === true) {
    return (
      <Modal open={open} title={<>{nameWihSentenceCase} was caught!</>} emoji="👍">
        <p>Give it a unique nickname to save it to your collection</p>
        <TextInput value={nickname} onChange={onNicknameChange} />
        <SmallCtaButton disabled={!nickname || hasPokemonWithNickname(nickname)} onClick={onCatchPokemon}>Save to my collection</SmallCtaButton>
        <SecondaryTextButton onClick={onClose}>Cancel</SecondaryTextButton>
      </Modal>
    )
  }

  if (canCatch === false) {
    return (
      <Modal open={open} title={<>Oops, failed to catch {nameWihSentenceCase}!</>} emoji="😞">
        <DangerCtaButton onClick={() => setCanCatch(null)}>Try again</DangerCtaButton>
        <DangerTextButton onClick={onClose}>Go back</DangerTextButton>
      </Modal>
    )
  }

  return (
    <Modal open={open} title={<>Trying to catch {nameWihSentenceCase}</>} emoji="⏳">
      <p>Please wait...</p>
    </Modal>
  )
}

export default CatchPokemon;
