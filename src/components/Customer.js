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
            } else if(response.status === 401) {
                // redirect to login page
                navigate('/login');
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

    function updateCustomer(e){
        e.preventDefault();
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
         <div className="p-3">
            {notFound ? <NotFound /> : null}
            {customer ? (
                <div>
                    <form className="w-full max-w-sm" id="customer" onSubmit={updateCustomer}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label for="name">Name</label>
                            </div>
                            <div className="md:w-3/4">
                                <input id="name" 
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text" value={tempCustomer.name}
                                onChange={(e) => {
                                    setChanged(true);
                                    setTempCustomer({...tempCustomer, name: e.target.value});                  
                                }}/>            
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label for="industry">Industry</label>    
                            </div>
                            <div className="md:w-3/4">
                                <input id="industry" 
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text" value={tempCustomer.industry}
                                onChange={(e) => {
                                    setChanged(true);
                                    setTempCustomer({...tempCustomer, industry: e.target.value});             
                                }}/>  
                            </div>
                        </div>
                    </form>  
                    {changed ? (
                            <div className='mb-2'>
                                <button
                                    className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-gray-500 py-2 px-4 border border-purple-500 hover:border-transparent mr-2 rounded"
                                    onClick={(e) => {
                                        setTempCustomer({ ...customer });
                                        setChanged(false);
                                    }}>Cancel</button>
                                <button
                                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    form="customer"
                                >Save</button>
                            </div>
                        ) : null}     
                    <div>
                        <button
                            className="bg-slate-800 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={(e) => {
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
                </div>
            ) 
            :             
            null }
            {error ? <p>{error}</p> : null}
            <br/>
            <Link to="/customers">
                <button className="no-underline bg-slate-800 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    ← Go back
                </button>
            </Link>  
        </div>
    );    
}