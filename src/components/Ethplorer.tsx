import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
//import './info.css'
import { address } from './info'

const Top20 = () => {
    
    useEffect(() => {
        
        const getTopTokenHolders = 
            'https://api.ethplorer.io/getTopTokenHolders/' 
            + address.eth.hoge 
            + '?apiKey='
            + process.env.REACT_APP_ETHPLORER_API_KEY
            + '&limit=21'
        
            fetch(getTopTokenHolders, { method: "GET" })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    },[])

    return <></>
}

export default Top20