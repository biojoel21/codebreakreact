import {useState, useEffect} from 'react';
export default function Dictionary(){
    const [word, setWord] = useState();
    const [word2, setWord2] = useState();

    useEffect(() => {
        console.log('word is', word);
    },[word]);

    useEffect(() => {
        console.log('word is', word2);
    },[word2]);

    //no dependency array --> update for any state change
    //empty array --> update only once
    //passing in data --> only execute when those state variables are changed

    return (
        <>
            <input type="text" onChange={(e) => {
                setWord(e.target.value);
            }} />   
            <h1>lets go {word}</h1>

            <input type="text" onChange={(e) => {
                setWord2(e.target.value);
            }} />   
            <h2>lets go {word2}</h2>
        </>
    )
}