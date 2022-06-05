import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import DATA from "./data.json";
import { COLUMNS } from "./columns";
// import "./styles.css"
import {
  useSortBy,
  usePagination,
} from "react-table/dist/react-table.development";
import Globalfilter from "./Globalfilter";
import ColumnFilter from "./ColumnFilter";

const KeywordTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    state,
    setGlobalFilter,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Globalfilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Keyword
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table
                  className="min-w-full divide-y divide-gray-300"
                  {...getTableProps()}
                >
                  <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <span>&#8595;</span>
                                ) : (
                                  <span>&#8593;</span>
                                )
                              ) : (
                                ""
                              )}{" "}
                            </span>
                            <div>
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody
                    className="divide-y divide-gray-200 bg-white"
                    {...getTableBodyProps()}
                  >
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ marginTop: "40px" }}>
                  <span>
                    page{" "}
                    <strong>
                      {" "}
                      {pageIndex + 1} of {pageOptions.length}{" "}
                    </strong>
                  </span>

                  <span>
                    | Go to Page{" "}
                    <input
                      type={"number"}
                      min="0"
                      max={pageOptions.length}
                      defaultValue={pageIndex + 1}
                      className="border-2 border-indigo-700 p-3 outline-indigo-700 "
                      onChange={(e) => {
                        const pageNumber = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        gotoPage(pageNumber);
                      }}
                      //   style={{ width: "50px" }}
                    />
                  </span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="border-2 p-3 border-indigo-300 outline-none mx-2"
                  >
                    {[10, 25, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize} className="">
                        {" "}
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="inline-flex items-center px-2 py-2 border border-indigo-700 text-base rounded-full shadow-sm text-white text-indigo-700 font-extrabold hover:font-bold  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                  >
                    {"<<"}
                  </button>
                  <button
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                  <button
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="inline-flex items-center px-2 py-2 border border-indigo-700 text-base rounded-full shadow-sm text-white text-indigo-700 font-extrabold hover:font-bold  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
                  >
                    {">>"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeywordTable;
