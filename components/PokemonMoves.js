import { useState } from 'react';
import styled from '@emotion/styled';

import { lg } from '../styles/breakpoints';
import { TextButton } from '../styles/shared';

const MoveItemsOuter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const MoveItemsWrapper = styled.div({
  alignSelf: 'stretch',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  justifyContent: 'space-between',
  gap: 8,
  marginBottom: 16,
  transition: '0.3s all ease',
  [lg.min]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  }
})

const MoveItem = styled.div({
  textTransform: 'capitalize',
  fontSize: 13,
  fontWeight: 500,
  color: 'dimgray',
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid lightgrey'
})

const ShowMoreLessButton = styled(TextButton)({
  color: 'green',
  fontSize: 13
})

const PokemonMoves = ({ moves = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const movesToDisplay = showAll ? moves : moves.slice(0, 12);

  return (
    <MoveItemsOuter>
      <MoveItemsWrapper>
        {movesToDisplay.map(({ move }) => <MoveItem key={move.name}>{move.name.replace(/-/g, ' ')}</MoveItem>)}
      </MoveItemsWrapper>
      {!showAll && movesToDisplay.length < moves.length && <ShowMoreLessButton onClick={() => setShowAll(true)}>Show all {moves.length} moves</ShowMoreLessButton>}
      {showAll && <ShowMoreLessButton onClick={() => setShowAll(false)}>Show only first 12 moves</ShowMoreLessButton>}
    </MoveItemsOuter>
  )
}

export default PokemonMoves;
