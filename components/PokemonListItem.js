import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PokemonListItem = ({ name, image, detailUrl, onDelete }) => (
  <Link href={detailUrl}>
    <a>
      {onDelete && (
        <button onClick={onDelete}>x</button>
      )}
      {image && <Image src={image} width={100} height={100} />}
      <div>
        <span>{name}</span>
      </div>
    </a>
  </Link>
)

export default PokemonListItem;
