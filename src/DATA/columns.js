export const columns = [
    {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
        disableSortBy: true,
        disableFilters: true,
        className: "dp-none",
        style: {
            fontWeight: "bolder",
            backgroundColor: "yellow",
        },
    },
    {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
    },
    {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
    },
    {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
    },
    {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
    },
    {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
        disableFilters: true,
    },
];

export const grouped_columns = [
    {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
    },
    {
        Header: "Name",
        Footer: "Name",
        columns: [
            {
                Header: "First Name",
                Footer: "First Name",
                accessor: "first_name",
            },
            {
                Header: "Last Name",
                Footer: "Last Name",
                accessor: "last_name",
            },
        ],
    },
    {
        Header: "Info",
        Footer: "Info",
        columns: [
            {
                Header: "Country",
                Footer: "Country",
                accessor: "country",
            },
            {
                Header: "Date of Birth",
                Footer: "Date of Birth",
                accessor: "date_of_birth",
            },
            {
                Header: "Phone",
                Footer: "Phone",
                accessor: "phone",
            },
        ],
    },
];
