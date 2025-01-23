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

    useEffect(() => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/' + search)
        .then(response => {    
            if(response.status === 404){
                setNotFound(true);  
            }             
            return response.json()
        })
        .then((data) => {
            setWord(data[0].meanings);
            console.log(data[0].meanings);                           
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