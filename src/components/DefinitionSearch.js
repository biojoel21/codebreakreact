import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function DefinitionSearch() {
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
        <form className="flex space-between space-x-2 max-w-[300px]"
            onSubmit={() => {
            navigate('/dictionary/' + word);
        }}>
            <input 
                className="shrink min-w-0 px-2 py-1 rounded"
                placeholder="Enter a word"
                type="text" onChange={(e) => {
                setWord(e.target.value);
            }} />   
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Search</button>
        </form>
    )
}
