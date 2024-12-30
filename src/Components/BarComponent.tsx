import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bar: React.FC = () => {
    let navigate = useNavigate();
    const handleClick = (route:string) => {
        navigate(route)
    }
    return (
        <>
            <div className='myBar'>
                {/* <div className='text-center'>
                </div> */}
                <ul>
                    <li><a onClick={() => handleClick('/')}>Striker Store</a></li>
                    <li><a onClick={() => handleClick('/yourCar')}>Carrito</a></li>
                    
                </ul>
            </div>
        </>
    );
}

export default Bar;