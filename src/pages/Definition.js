import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
    //const [word, setWord] = useState([]);
    //const [notFound, setNotFound] = useState(false);    
    //const [error, setError] = useState(false);

    let { search } = useParams();
    const navigate = useNavigate();    
    const location = useLocation();
    const { data: [{ meanings: word}] =[{}], errorStatus} = useFetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/' + search); 

    if(errorStatus === 404){  
        return (
            <>
                <NotFound/>
                <hr/>
                <p>Search again:</p>
                <DefinitionSearch/>
            </>
        );
    }

    if(errorStatus){  
        return (
            <>
                <p>Something went wrong</p>
                <hr/>
                <p>Search again:</p>
                <DefinitionSearch/>
            </>
        );
    }

    return (
    <>        
        {word ? (
            <>
            <h1>Here is a definition:</h1>
            {word.map((meaning) => {
                return (
                    <p key={uuidv4()}>
                        {meaning.partOfSpeech + ': '} 
                        {meaning.definitions[0].definition}                    
                    </p>
                );
            })}
            <hr/>
            <p>Search again:</p>
            <DefinitionSearch/>
            </>
        ) : null}
    </>
    );
}