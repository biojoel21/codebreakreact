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
            return response.json();
        })
        .then((data) => {
            setCustomer(data.customer);
            setTempCustomer(data.customer);
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
            return response.json();
        })
        .then((data) => {
            setCustomer(data.customer);
            setChanged(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return (
         <>
            {notFound ? <NotFound /> : null}
            {customer ? (
                <div>
                    <p class="m-2 block px-2">{tempCustomer.id} </p>            
                    <input class="m-2 block px-2" type="text" value={tempCustomer.name}
                    onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({...tempCustomer, name: e.target.value});                  
                    }}/>            
                    <input class="m-2 block px-2" type="text" value={tempCustomer.industry}
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
                </div>
            ) : null }
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
                    console.log(e);
                });
            }}>Delete</button>
            <br/>
            <Link to="/customers">Go back</Link>  
        </>
    );    
}