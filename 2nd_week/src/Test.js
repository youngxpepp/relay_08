import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

export default () => {
    const [data, setData] = useState([]);

    const fetchCsv = () => {
        return fetch('/data.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');
            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    };

    useEffect(() => {
        getCsvData();
    }, []);

    const getData = (result) => {
        console.log(result.data);
        setData(result.data);
    };

    const getCsvData = async () => {
        let csvData = await fetchCsv();
        Papa.parse(csvData, {
            complete: getData,
        });
    };

return <Fragment></Fragment>;
};

const Data = styled.div`
    color: blue;
`;
