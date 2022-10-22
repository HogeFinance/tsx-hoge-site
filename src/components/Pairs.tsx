import React, { useState } from 'react';
import {ethers} from 'ethers'
/*
class Chains {
    eth = EvmChain.ETHEREUM;
    bsc = EvmChain.BSC;
    polygon = EvmChain.POLYGON;
    ftm = EvmChain.FANTOM
    xdai = EvmChain.create("0x64")
    okc = EvmChain.create("0x42")
}
*/
class Hoge {
    eth = "0xfAd45E47083e4607302aa43c65fB3106F1cd7607"
    bsc = "0xa4FFfc757e8c4F24E7b209C033c123D20983Ad40"
    polygon = "0x58c1BBb508e96CfEC1787Acf6Afe1C7008A5B064"
    ftm = "0xda6115d4ecec98d1fe02c69d846405d41049eed2"
    xdai = "0xDfF7fcF6a86F7Dc86E7facECA502851f82a349A6"
    okc = "0x9873795F5DAb11e1c0342C4a58904c59827ede0c"
}

class Pair {
    eth = "0x7FD1de95FC975fbBD8be260525758549eC477960"
    bsc = "0xCed4F946feBCAc72d6727C07dE5B2664b2267a6F"
    polygon = ""
    ftm = "0xF31778D591c558140398F46feCA42A6a2dbFFe90"
    xdai = "0xaf67e4b3dfe7fddbbc3c54047285fde72eaefd7c"
    okc = "0x6301Ce2a18410ad80c8511cA20288933dC32d61F"
}

const Pairs = () => {

    const [thing, setThing] = useState<JSX.Element>(<>{''}</>)
    const [result, setResult] = useState<any>()
    
    React.useEffect(() => {
        
        const go = async () => {            
            var url = 'https://mainnet.infura.io/v3/' + process.env.REACT_APP_INFURA_API_KEY;
            var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
            customHttpProvider.getBlockNumber().then((result) => {
                setResult("Current ETH block number: " +  result)
            })
            setThing(<>{result}</>)
        }
        go()
        
    }, [result])

    return (<>{thing}</>)
}
    



export default Pairs