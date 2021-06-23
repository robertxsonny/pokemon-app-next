import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import Modal from './Modal';
import { SentenceCase, SmallCtaButton, TextButton } from '../styles/shared';

import { useMyPokemons } from '../hooks/my-pokemon';

const DangerTextButton = styled(TextButton)({
  color: 'red',
  marginTop: 12
})

const DangerLinkButton = DangerTextButton.withComponent('a');

const DangerCtaButton = styled(SmallCtaButton)({
  backgroundColor: 'red',
  '&:hover:not([disabled])': {
    backgroundColor: 'firebrick'
  },
  '&:active:not([disabled])': {
    backgroundColor: 'darkred'
  }
})

const ReleasePokemon = ({ open, nickname, onClose }) => {
  const { releasePokemon } = useMyPokemons();
  const [released, setReleased] = useState(false);

  useEffect(() => {
    if (open) {
      setReleased(false)
    }
  }, [open])

  const onReleasePokemon = () => {
    releasePokemon(nickname);
    setReleased(true);
  }

  const nameWihSentenceCase = <SentenceCase>{nickname}</SentenceCase>

  if (released) {
    return (
      <Modal open={open} title={<>{nameWihSentenceCase} has been released</>} emoji="🕊️">
        <Link href="/my-pokemon">
          <DangerLinkButton>Go back to my collection</DangerLinkButton>
        </Link>
      </Modal>
    )
  }

  return (
    <Modal open={open} title={<>Are you sure you want to release {nameWihSentenceCase}?</>} emoji="⚠️">
      <DangerCtaButton onClick={onReleasePokemon}>Yes, release from collection</DangerCtaButton>
      <DangerTextButton onClick={onClose}>No, cancel</DangerTextButton>
    </Modal>
  )
}

export default ReleasePokemon;
