import styled from '@emotion/styled';

import PokemonType from './PokemonType';
import PokemonMoves from './PokemonMoves';
import { SentenceCase } from '../styles/shared';
import { md, sm } from '../styles/breakpoints';

const DetailContent = styled.section({
  flex: 1,
  paddingBottom: 84
})

const DetailHeader = styled.div({
  backgroundColor: 'white',
  'h1, h3': {
    margin: 0
  },
  [sm.max]: {
    position: 'sticky',
    top: 0,
    padding: '12px 0'
  },
  [md.min]: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  }
})

const Title = styled(SentenceCase.withComponent('h1'))({
  [sm.max]: {
    textAlign: 'center',
    fontSize: 24,
    'small': {
      marginLeft: 8,
      fontSize: 14
    }
  },
  [md.min]: {
    paddingRight: 16,
    'small': {
      marginLeft: 8,
      fontSize: 16
    }
  }
});

const CenteredFlex = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center'
})

const SectionTitle = styled.h2({
  fontSize: 20,
  'small': {
    fontSize: 16,
    marginLeft: 6
  }
});

const SmallCardWrapper = styled(CenteredFlex)({
  margin: '16px -8px',
  [md.min]: {
    justifyContent: 'flex-start'
  }
})

const SmallCard = styled.div({
  backgroundColor: 'slategray',
  color: 'white',
  width: 120,
  height: 90,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  margin: 8,
  fontSize: 13,
  'h3': {
    marginTop: 0,
    marginBottom: 8,
    fontSize: 28
  },
  [sm.max]: {
    width: 80,
    height: 60,
    margin: 4,
    fontSize: 12,
    'h3': {
      marginBottom: 4,
      fontSize: 20
    }
  }
})


const PokemonDetail = ({ name, nickname, types, moves, height, weight, numOfCollected }) => (
  <DetailContent>
    <DetailHeader>
      <Title>
        {nickname ? (<>{nickname}<small>({name})</small></>) : name}
      </Title>
      <CenteredFlex>{types.map(({ type }) => <PokemonType key={type.name} type={type.name} />)}</CenteredFlex>
    </DetailHeader>
    <SmallCardWrapper>
      {height && (
        <SmallCard>
          <h3>{height}</h3>
          Height (in)
        </SmallCard>
      )}
      {weight && (
        <SmallCard>
          <h3>{weight}</h3>
          Weight (lbs)
        </SmallCard>
      )}
      {Number.isInteger(numOfCollected) && (
        <SmallCard>
          <h3>{numOfCollected}</h3>
          In Collection
        </SmallCard>
      )}
    </SmallCardWrapper>
    <div>
      <SectionTitle>Moves</SectionTitle>
      <PokemonMoves moves={moves} />
    </div>
  </DetailContent>
)

export default PokemonDetail;