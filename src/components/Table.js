import React,{useMemo} from 'react';
import { useTable,useGlobalFilter,useFilters } from 'react-table';
import DATA from "./data.json";
import {COLUMNS} from "./columns"
import "./styles.css"
import { useSortBy,usePagination } from 'react-table/dist/react-table.development';
import Globalfilter from './Globalfilter';
import ColumnFilter from "./ColumnFilter"


const Table = () => {

    const columns = useMemo(()=> COLUMNS,[])
    const data = useMemo(()=>DATA,[])
    const defaultColumn = useMemo(()=> {
        return {
            Filter:ColumnFilter
        }
    },[])
    const {getTableProps,getTableBodyProps,state,setGlobalFilter  ,headerGroups,footerGroups,rows,page,prepareRow,nextPage,previousPage,canNextPage,canPreviousPage,pageOptions,gotoPage,pageCount,setPageSize} = useTable({
        columns,
        data,
        defaultColumn 
    },useFilters,useGlobalFilter,useSortBy,usePagination)

 const {globalFilter,pageIndex,pageSize} =state

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
                     page.map(row=> {
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
           
            {/* <tfoot>
                {
                  footerGroups.map(footerGroup => (
                      <tr {...footerGroup.getFooterGroupProps()}>
                          {footerGroup.headers.map(column => (
                              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
                          ))}
                      </tr>
                  ))  
                }

            </tfoot> */}
        </table>
        <div style={{marginTop:"40px"}}>
        <span>
            page {" "} <strong> {pageIndex + 1} of {pageOptions.length} {" "}</strong>
        </span>

        <span>
            | Go to Page <input type={'number'} min="0" max={pageOptions.length} defaultValue={pageIndex+1} onChange={ e =>{
                 const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                 gotoPage(pageNumber)
                } 
            } style={{width:"50px"}}/>
        </span >
            <select value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
              {  [10,25,50].map(pageSize => (
                    <option  key={pageSize} value={pageSize}> Show {pageSize}</option>
                ))}
            </select>
            <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previoud</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>
        </div>

        </>
    );
};

export default Table;