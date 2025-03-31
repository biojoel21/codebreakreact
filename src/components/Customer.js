import { useParams, Link, useNavigate } from 'react-router-dom';
import { use, useEffect, useState } from 'react';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

export default function Customer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if(!customer) return;
        if(!tempCustomer) return;

        if(tempCustomer.name === customer.name 
            && tempCustomer.industry === customer.industry){
                setChanged(false);
            } else {
                setChanged(true);
            }
    });

    useEffect(() => {        
        const url = baseUrl + 'api/customers/' + id;
        fetch(url)
        .then((response) => {
            if(response.status === 404) {
                // redirect to 404 page
                // render  
                //navigate('/404');
                setNotFound(true);
            }

            if(!response.ok) throw new Error('Something went wrong');

            return response.json();
        })
        .then((data) => {
            setCustomer(data.customer);
            setTempCustomer(data.customer);
            setError(undefined);
        })
        .catch((e) => {
            console.log(e);
            setError(e.message);
        });
    },[]);

    function updateCustomer(){
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempCustomer),
        })
        .then((response) => {
            if(!response.ok) throw new Error('Something went wrong');
            return response.json();
        })
        .then((data) => {
            setCustomer(data.customer);
            setChanged(false);
            console.log(data);
            setError(undefined);
        })
        .catch((e) => {
            console.log(e);
            setError(e);
        });
    }

    return (
         <>
            {notFound ? <NotFound /> : null}
            {customer ? (
                <div>
                    <p className="m-2 block px-2">{tempCustomer.id} </p>            
                    <input className="m-2 block px-2" type="text" value={tempCustomer.name}
                    onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({...tempCustomer, name: e.target.value});                  
                    }}/>            
                    <input className="m-2 block px-2" type="text" value={tempCustomer.industry}
                     onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({...tempCustomer, industry: e.target.value});             
                    }}/>    
                    {changed ? 
                        (
                            <>
                                <button 
                                    className='m-2'
                                    onClick={(e) => { 
                                        setTempCustomer({...customer});
                                        setChanged(false);}}>Cancel</button> 
                                <button 
                                    className='m-2'
                                    onClick={updateCustomer}>Save</button>
                            </>
                        ): null}      
            
                    <button onClick={(e) => {
                        const url = baseUrl + 'api/customers/' + id;
                        fetch(url, { 
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            if(!response.ok) {
                                throw new Error('Something went wrong');
                            }
                            navigate('/customers');
                        })
                        .catch((e) => {
                            setError(e.message);
                        });
                    }}>Delete</button>                    
                </div>
            ) 
            :             
            null }
            {error ? <p>{error}</p> : null}
            <br/>
            <Link to="/customers">Go back</Link>  
        </>
    );    
}