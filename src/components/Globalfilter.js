import React from 'react';

const Globalfilter = ({filter,setFilter}) => {
    return (
        <span> 
            Search : { " "}
            <input onChange ={ (e) => setFilter(e.target.value)} />
            
        </span>
    );
};

export default Globalfilter;