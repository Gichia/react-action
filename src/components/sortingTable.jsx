import React, { useMemo, useCallback } from "react";
import { 
    useTable, 
    useSortBy,
    useFilters, 
    useExpanded, 
    useRowSelect,
    usePagination, 
    useGlobalFilter,
} from "react-table";

import { columns } from "../DATA/columns";
import MOCK_DATA from "../DATA/MOCK_DATA.json";

import Checkbox from "./rowSelect";
import FilterInput from "./filterInput";
import EditableCell from "./editableCell";

import "./table.css"
import ColumnFilter from "./columnFilter";

const SortingTable = () => {

    const renderRowSubComponent = useCallback(
        ({ row }) => (
          <pre
            style={{
              fontSize: "10px",
            }}
          >
            <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
          </pre>
        ),
        []
    );

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        // setSkipPageReset(true)
        // setData(old =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex],
        //         [columnId]: value,
        //       }
        //     }
        //     return row
        //   })
        // )
    };

    const defaultColumn = useMemo(() => {
        return {
            Cell: EditableCell,
            Filter: ColumnFilter,
        }
    }, []);

    const DATA = useMemo(() => MOCK_DATA, []);
    const COLUMNS = useMemo(() => columns, []);

    const { 
        page,
        state,
        nextPage,
        gotoPage,
        pageCount,
        prepareRow,
        pageOptions, 
        setPageSize,
        canNextPage,
        previousPage,
        headerGroups,
        footerGroups,
        getTableProps,
        // visibleColumns,
        setGlobalFilter,
        canPreviousPage,
        selectedFlatRows,
        getTableBodyProps, 
    } = useTable(
        { columns: COLUMNS, data: DATA, defaultColumn, updateMyData, },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination, 
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push(columns => {
                return [
                    {
                        id: "expander",
                        Header: () => null,
                        Cell: ({ row }) => (
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>
                        ),
                    },
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        });

    const { globalFilter, pageIndex, pageSize, expanded } = state;

    return (
        <>
            <FilterInput filter={globalFilter} setFilter={setGlobalFilter} />

            <pre>
                <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
            </pre>

            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <>
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render("Header")}
                                                <span>
                                                    { column.isSorted ? (column.isSortedDesc ? " ^" : " ?" )  : "" }
                                                </span>
                                                <div>{ column.canFilter ? column.render("Filter") : null }</div>
                                            </th>
                                        </>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row);

                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        })
                                    }
                                    {
                                        row.isExpanded ? (
                                            <tr>
                                                <td>
                                                    { renderRowSubComponent({ row }) }
                                                </td>
                                            </tr>
                                        ) : null
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
                                {
                                    footerGroup.headers.map(column => (
                                        <td {...column.getFooterProps()}>{column.render("Footer")}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot>
            </table>

            <pre>
                <code>
                    {
                        JSON.stringify({
                            selectedFlatRows : selectedFlatRows.map(row => row.original),
                        }, null, 2)
                    }
                </code>
            </pre>

            <div>
                <span>
                    Page{" "}
                    <strong>{pageIndex + 1} of {pageOptions.length}</strong>{" "}
                </span>

                <span>
                    | Go to page: {" "}
                    <input 
                        type="number"
                        style={{ width: "50px" }}
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(pageNumber);
                        }}
                    />
                </span>

                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(size => (
                            <option key={size} value={size}>Show {size}</option>
                        ))
                    }
                </select>

                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>

                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>

                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
            </div>
        </>
    );
};

export default SortingTable;
