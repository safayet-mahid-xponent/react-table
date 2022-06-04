import React from 'react';

const Globalfilter = ({column}) => {
    const {filterValue,setFilter} = column
    return (
        <span> 
            Search : { " "}
            <input onChange ={ (e) => setFilter(e.target.value)} />
            
        </span>
    );
};

export default Globalfilter;