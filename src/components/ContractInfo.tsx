import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import './info.css'
import { address } from './info'

export const hoge = {
    eth: "0xfAd45E47083e4607302aa43c65fB3106F1cd7607",
    bsc: "0xa4FFfc757e8c4F24E7b209C033c123D20983Ad40",
    polygon: "0x58c1BBb508e96CfEC1787Acf6Afe1C7008A5B064",
    ftm: "0xF31778D591c558140398F46feCA42A6a2dbFFe90",
    xdai: "0xDfF7fcF6a86F7Dc86E7facECA502851f82a349A6",
    okc: "0x9873795F5DAb11e1c0342C4a58904c59827ede0c"
}

export const pair = {
    eth: "0x7FD1de95FC975fbBD8be260525758549eC477960",
    bsc: "0xCed4F946feBCAc72d6727C07dE5B2664b2267a6F",
    polygon: "0x15B09d465Ec44B6378dC92059fbDF0e4f65AEF43",
    ftm: "0xda6115d4ecec98d1fe02c69d846405d41049eed2",
    xdai: "0xaf67e4b3dfe7fddbbc3c54047285fde72eaefd7c",
    okc: "0x6301Ce2a18410ad80c8511cA20288933dC32d61F"
}


export const ContractInfo = () => {
    const ethMsg = 'ETH Block Number'
    const gasMsg = 'Esitmated Gas Price'
    const [info, setInfo] = useState<JSX.Element>(<>{''}</>)
    const [block, setBlock] = useState<any>(ethMsg)
    const [gas, setGas] = useState<any>(gasMsg)
    const [wait, setWait] = useState<boolean>(false)

    useEffect(() => {
        


        const makeContractLine = (_link:string, _text:string, _address:string) => {
            return (
                <h3>
                    {_text} <a href={_link + address} target='_blank' rel="noreferrer">contract</a>
                    <br/><small>{_address}</small>
                </h3>
            )
        }

        const makePairLine= (_link:string, _chain:string, _swap:string, _address:string) => {
            let url:string
            if(_chain === 'Polygon') {
                url = _link + '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/0x58c1BBb508e96CfEC1787Acf6Afe1C7008A5B064?fee=100&twap=true&chainId=137'
            } else { url = _link + _address}
            return (
                <h3>
                    {_chain} dex pair <a href={url} target='_blank' rel="noreferrer">{_swap}</a>
                    <br/><small>{_address}</small>
                </h3>
            )
        }
        const contracts = <div className='someBorder'>
            {makeContractLine('https://etherscan.io/token/', 'Eth', address.eth.hoge)}
            {makeContractLine('https://bscscan.com/address/', 'BSC', address.bsc.hoge)}
            {makeContractLine('https://polygonscan.com/address/', 'Polygon', address.polygon.hoge)}
            {makeContractLine('https://ftmscan.com/token/', 'FTM', address.ftm.hoge)}
            {makeContractLine('https://blockscout.com/xdai/mainnet/address/', 'xDai', address.xdai.hoge)}
            {makeContractLine('https://www.oklink.com/en/okc/address/', 'OKC', address.okc.hoge)}
        </div>

        const pairs = <div className='someBorder'>
            {makePairLine('https://v2.info.uniswap.org/pair/', 'Eth', 'Uniswap', address.eth.pair)}
            {makePairLine('https://pancakeswap.finance/info/pools/', 'BSC','Pancakeswap', address.bsc.pair)}
            {makePairLine('https://app.sushi.com/trident/pool/', 'Polygon','Sushiswap', address.polygon.pair)}
            {makePairLine('https://info.shibafantom.finance/pair/', 'FTM','Shibaswap', address.ftm.pair)}
            {makePairLine('https://info.honeyswap.org/#/pair/', 'xDai','Honeyswap', address.xdai.pair)}
            {makePairLine('https://okinfo.cherryswap.net/pair/', 'OKC','Cherryswap', address.okc.pair)}
        </div>

        if (contracts!==undefined && pairs !== undefined) {
            setInfo(<div className='someBorder'>
                
                <h2 id='ethBlock'>
                        {block}<br/>
                        {gas}<br/>    
                    </h2>
                <div id='note'>* updates every minute *</div>
                <div className='infoDiv'>
                    {contracts}
                    {pairs}
                </div>
            </div>)
        }

        const go = async () => {
            if (block !== ethMsg || gas !== gasMsg) {return}
            const api = process.env.REACT_APP_INFURA_API_KEY
            if (api!==undefined) {
                var url = 'https://mainnet.infura.io/v3/' + api
                var customHttpProvider = new ethers.providers.JsonRpcProvider(url)
                if (block === ethMsg){
                    await customHttpProvider.getBlockNumber()
                    .then((res) => {
                        setBlock("Current ETH block number: " +  res)
                    })
                }
                if (gas === gasMsg) {
                    await customHttpProvider.getGasPrice()
                    .then((res) => {
                        const wei = res.mul(10**9)

                        setGas("Estimated Gas Price: " + 
                            ethers.utils.formatEther(wei).toString().split('.')[0] +
                            ' Gwei')
                    })
                }
                
            }
            
            console.log('Go')

        }

        function clearStates() {
            setBlock(ethMsg)
            setGas(gasMsg)
            setWait(false)
        }

        if (!wait){
            go()
            setWait(true)
            const min = 60 * 1000
            window.setTimeout(clearStates, 1*min)
        }
        
    }, [block, gas, wait])

    return info
}
    
export default ContractInfo
