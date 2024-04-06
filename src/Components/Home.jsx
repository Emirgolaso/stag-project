import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './home.css'

function Home() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(data => {
                Promise.all(data.results.map(pokemon =>
                    fetch(pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => ({
                            name: pokemon.name,
                            image: pokemonData.sprites.front_default,
                        }))
                )).then(pokemonsWithImages => {
                    setPokemons(pokemonsWithImages)
                })
            }).catch(err=>{
                console.error('please errror fetching ',err);
            })

    },[])
    return (
        <div>
            {
                pokemons.map(pokemon => (
                    <div className='container'>
                    <div className='col'>
                        <img src={pokemon.image} alt={pokemon.name} />

                        <h3>{pokemon.name}</h3>
                    </div>
                    </div>
                ))
            }


        </div>
    )
}

export default Home



