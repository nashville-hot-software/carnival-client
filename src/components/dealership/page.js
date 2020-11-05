import { FlatList, Text } from 'flatlist-react';
import React, { useState, useEffect } from 'react';
import DealershipManager from "../../api/dataManager";

const DealershipPage = props => {

    const [data, setData] = useState([]);
    const [dealerships, setDealerships] = useState([]);

    const getDealership = () => {
        DealershipManager.getOne("dealerships", props.dealershipId)
        .then(response => {
            setData(response)
            setDealerships(response)
        })
    }
        
    useEffect(() => {
        getDealership();
    }, []);
    
    const item = (dealership, idx) => {
        return (
            <li key={idx}>
        <span>{dealership.business_name}</span>
        </li>
        );
    };


    return (
        <>
            <ul>
                <FlatList 
                list={dealerships} 
                renderItem = {item} 
                />
            </ul>
        </>
    );
};

export default DealershipPage;