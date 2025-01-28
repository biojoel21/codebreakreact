import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../components/NotFound";

export default function Definition() {
    const [word, setWord] = useState([]);
    const [notFound, setNotFound] = useState(false);
    console.log(useParams());
    let { search } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    useEffect(() => {
        const url = 'https://httpstat.us/500';
        //const url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + search;

        fetch(url)
        .then(response => {    
            //console.log(response.status);
            if(response.status === 404){
                setNotFound(true);  
            } else if (response.status === 401){
                navigate('/login')
            }
            else if (response.status === 500){
                setError(true)
            }

            if(!response.ok){
                setError(true);
                throw new Error('An error occurred');
            }
            return response.json()
        })
        .then((data) => {
            setWord(data[0].meanings);                        
        })
        .catch((e) => {
            console.log(e.message);
        });
    }, []);   

    if(notFound === true){  
        return (
            <>
                <NotFound/>
                <Link to="/dictionary">Go back to the dictionary</Link>
            </>
        );
    }

    if(error === true){  
        return (
            <>
                <p>Something went wrong</p>
                <Link to="/dictionary">Go back to the dictionary</Link>
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
            </>
        ) : null}
    </>
    );
}