import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const Table = () => {
    const [data, setData] = useState([]);
    const [search, setSearchData] = useState("");
    const [filteredData , setFilteredData] = useState([])
    const getData = async () => {
        try {
            const response = await axios.get(
                "https://smarthub-test.herokuapp.com/account/list"
            );
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const onDelete = async (id) => {
        console.log(id);
        try{
            let response = await axios(`https://smarthub-test.herokuapp.com/account/delete/:${id}`)
            getData();
        } catch ( error ) {
            console.log(error)
        }
    }

    const columns = [
        {
            name: "Age",
            selector: (row) => row.age,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Action",
            cell: (row) => (<button className="btn btn primary" onClick={() => onDelete(row.id)}>Delete</button>)
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const result = data.filter((data) => {
            return data.name.toLowerCase().match(search.toLowerCase());
        })
        setFilteredData(result);
    }, [search])

    return (
    <DataTable 
        columns={columns} 
        data={filteredData} 
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
            <input 
                type="text" 
                placeholder="Search" 
                className="w-25 form-control" 
                value={search} 
                onChange={(e) => setSearchData(e.target.value)}
            >
            </input>
        }
        subHeaderAlign="right"
    />);
};

export default Table;
