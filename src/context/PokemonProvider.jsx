import { useEffect, useState } from "react"
import { useForm } from "../hook/useForm"
import { PokemonContext } from "./PokemonContext"


const PokemonProvider = ({children}) => {
   
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    const {valueSearch, onInputChange, onResetForm} = useForm ({
        valueSearch: '',
    })

    const [loading, setLoading] = useState(true)
    

    // llamar 50 pokemons a la API    
    const getAllPokemons = async(limit = 50) => {

    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`) 
    const data = await res.json();
    
    const promises = data.results.map(async(pokemon) => {
        const res = await fetch (pokemon.url)
        const data = await res.json()
        return data
    })

    const results = await Promise.all(promises)
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false)
} 
    //llamar a todos los pokemons

    const getGlobalPokemons = async() => {

            const baseURL = 'https://pokeapi.co/api/v2/';
        
            const res = await fetch(`${baseURL}pokemon?limit=500&offset=0`) 
            const data = await res.json();
            
            const promises = data.results.map(async pokemon => {
                const res = await fetch (pokemon.url)
                const data = await res.json()
                return data
            })  
        
            const results = await Promise.all(promises)
            setGlobalPokemons(results);
            setLoading(false)
        } 
    
    // llamar pokemons por ID

    const getPokemonById = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};


    useEffect(() => {
       getAllPokemons() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[offset])

    useEffect(() => {
        getGlobalPokemons()
    },[])
    
    //cargar mas

    const onClickLoadMore = () => {
        setOffset(offset + 50)
    }

    //const [filteredPokemons, setfilteredPokemons] = useState([]);

    return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById,
        //filteredPokemons,
        onClickLoadMore,
        loading,
        setLoading
    }} >
        {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider
