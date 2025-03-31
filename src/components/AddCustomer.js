import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function AddCustomer(props) {
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');    
    const [show, setShow] = useState(props.show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button 
                onClick={props.toogleShow} 
                className="block m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                + Add Customer</button>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            setName('');
                            setIndustry('');                            
                            props.newCustomer(name,industry);  
                        }}
                        id='editmodal' className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                    Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                       id="name" 
                                       type="text" 
                                       placeholder='Customer'
                                       value={name}
                                       onChange={(e) => {
                                             setName(e.target.value);
                                       }} />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="industry">
                                    Industry
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                       id="industry" 
                                       placeholder='Industry'
                                       type="text" 
                                       value={industry} 
                                       onChange={(e) => {
                                        setIndustry(e.target.value);
                                  }}/>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                    onClick={props.toogleShow}>
                        Close
                    </button>
                    <button                         
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        form="editmodal">Add</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}