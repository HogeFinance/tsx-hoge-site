import React, { useState } from 'react';
import { ethers } from 'ethers'
import './Pairs.css'

class Hoge {
    eth = "0xfAd45E47083e4607302aa43c65fB3106F1cd7607"
    bsc = "0xa4FFfc757e8c4F24E7b209C033c123D20983Ad40"
    polygon = "0x58c1BBb508e96CfEC1787Acf6Afe1C7008A5B064"
    ftm = "0xF31778D591c558140398F46feCA42A6a2dbFFe90"
    xdai = "0xDfF7fcF6a86F7Dc86E7facECA502851f82a349A6"
    okc = "0x9873795F5DAb11e1c0342C4a58904c59827ede0c"
}
class Pair {
    eth = "0x7FD1de95FC975fbBD8be260525758549eC477960"
    bsc = "0xCed4F946feBCAc72d6727C07dE5B2664b2267a6F"
    polygon = "0x15B09d465Ec44B6378dC92059fbDF0e4f65AEF43"
    ftm = "0xda6115d4ecec98d1fe02c69d846405d41049eed2"
    xdai = "0xaf67e4b3dfe7fddbbc3c54047285fde72eaefd7c"
    okc = "0x6301Ce2a18410ad80c8511cA20288933dC32d61F"
}

const Pairs = () => {
    const [info, setInfo] = useState<JSX.Element>(<>{''}</>)
    const [result, setResult] = useState<any>()
    const makeContractLine = (link:string, text:string, address:string) => {
        return (
            <h3>
                {text} <a href={link + address} target='_blank' rel="noreferrer">contract</a>
                <br/><small>{address}</small>
            </h3>
        )
    }
    const makePairLine= (link:string, chain:string, swap:string, address:string) => {
        let url:string
        if(chain === 'Polygon') {
            url = link + '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/0x58c1BBb508e96CfEC1787Acf6Afe1C7008A5B064?fee=100&twap=true&chainId=137'
        } else { url = link + address}
        return (
            <h3>
                {chain} dex pair <a href={url} target='_blank' rel="noreferrer">{swap}</a>
                <br/><small>{address}</small>
            </h3>
        )
    }
    React.useEffect(() => {
        const hoge = new Hoge()
        const contracts = <div className='someBorder'>
            {makeContractLine('https://etherscan.io/token/', 'Eth', hoge.eth)}
            {makeContractLine('https://bscscan.com/address/', 'BSC', hoge.bsc)}
            {makeContractLine('https://polygonscan.com/address/', 'Polygon', hoge.polygon)}
            {makeContractLine('https://ftmscan.com/token/', 'FTM', hoge.ftm)}
            {makeContractLine('https://blockscout.com/xdai/mainnet/address/', 'xDai', hoge.xdai)}
            {makeContractLine('https://www.oklink.com/en/okc/address/', 'OKC', hoge.okc)}
        </div>
        const pair = new Pair()
        const pairs = <div className='someBorder'>
            {makePairLine('https://v2.info.uniswap.org/pair/', 'Eth', 'Uniswap', pair.eth)}
            {makePairLine('https://pancakeswap.finance/info/pools/', 'BSC','Pancakeswap', pair.bsc)}
            {makePairLine('https://app.sushi.com/trident/pool/', 'Polygon','Sushiswap', pair.polygon)}
            {makePairLine('https://info.shibafantom.finance/pair/', 'FTM','Shibaswap', pair.ftm)}
            {makePairLine('https://info.honeyswap.org/#/pair/', 'xDai','Honeyswap', pair.xdai)}
            {makePairLine('https://okinfo.cherryswap.net/pair/', 'OKC','Cherryswap', pair.okc)}
        </div>
        const go = async () => {            
            var url = 'https://mainnet.infura.io/v3/' + process.env.REACT_APP_INFURA_API_KEY;
            var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
            customHttpProvider.getBlockNumber().then((result) => {
                setResult("Current ETH block number: " +  result)
            })
            setInfo(<div className='someBorder'><h2 id='ethBlock'>{result}</h2><div className='infoDiv'>{contracts}{pairs}</div></div>)
        }
        go()    
    }, [result])
    return info
}
    
export default Pairs
