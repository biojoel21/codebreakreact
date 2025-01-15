import {useState, useEffect} from 'react';
export default function Dictionary(){
    const [word, setWord] = useState();

    useEffect(() => {
        console.log('word is', word);
    });

    return (
        <>
            <input type="text" onChange={(e) => {
                setWord(e.target.value);
            }} />   
            <h1>lets go {word}</h1>
        </>
    )
}