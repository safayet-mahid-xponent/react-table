import React,{useMemo} from 'react';
import { useTable,useGlobalFilter,useFilters } from 'react-table';
import DATA from "./data.json";
import {COLUMNS} from "./columns"
import "./styles.css"
import { useSortBy } from 'react-table/dist/react-table.development';
import Globalfilter from './Globalfilter';

const Table = () => {

    const columns = useMemo(()=> COLUMNS,[])
    const data = useMemo(()=>DATA,[])
    const {getTableProps,getTableBodyProps,state,setGlobalFilter  ,headerGroups,footerGroups,rows,prepareRow} = useTable({
        columns,
        data 
    },useFilters,useGlobalFilter,useSortBy)

 const {globalFilter} =state

    return (
        <>
        <Globalfilter filter={globalFilter} setFilter={setGlobalFilter}/>

        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map( headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                                        <span>{ column.isSorted ? (column.isSortedDesc ? <span>&#8595;</span> :<span>&#8593;</span>   ): "" } </span>
                                        <div>{column.canFilter ? column.render("Filter"): null}</div>
                    
                                    
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
               
               

            </thead>
            <tbody {...getTableBodyProps()}>
           
                 {
                     rows.map(row=> {
                         prepareRow(row)
                         return (
                             <tr {...row.getRowProps()}>
                                 {
                                     row.cells.map(cell=>{
                                         return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                     })
                                 }

                             </tr>
                         )
                     })
                 }  
            </tbody>
           
            <tfoot>
                {
                  footerGroups.map(footerGroup => (
                      <tr {...footerGroup.getFooterGroupProps()}>
                          {footerGroup.headers.map(column => (
                              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
                          ))}
                      </tr>
                  ))  
                }

            </tfoot>
        </table>

        </>
    );
};

export default Table;