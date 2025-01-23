import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dictionary(){
    const [word, setWord] = useState();
    const navigate = useNavigate();

    // no dependency array --> update for any state change
    // useEffect(() => {
    //     console.log('State Updated', word, + ' ' + word2);
    // });

    // empty dependency array --> update only once
    // useEffect(() => {
    //     console.log('State Updated', word, + ' ' + word2);
    // },[]);

    // dependency array with values --> update only when those values change
    // useEffect(() => {
    //     console.log('State Updated', word, + ' ' + word2);
    // },[word]);

    return (
        <>
            <input type="text" onChange={(e) => {
                setWord(e.target.value);
            }} />   
            <button onClick={() => {
                navigate('/definition/' + word, {replace: true});
            }}>Search</button>
        </>
    )
}