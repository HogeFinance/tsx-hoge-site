import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import './info.css'
import { address } from './info'
import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';




const JsonCalc = () => {

    const [info, setInfo] = useState<JSX.Element>(<>{''}</>)
    const [pairs, setPairs] = useState<JSX.Element>(<>{''}</>)
    const [EthBalance, setEthBalance] = useState<any>()
    const [wait, setWait] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)

    useEffect(() => {

        const makePairLine = async (_chain:EvmChain, _address:string) => {
            const chain = _chain;
            const pairAddress = _address;
            const response = await Moralis.EvmApi.defi.getPairReserves({
                pairAddress,
                chain,
            });
            
            if (response.result.reserve0 !== undefined && response.result.reserve1 !== undefined) {
                console.log(response.result);
                let r0, r1
                const reserves = (r0:any, r1:any, token:string) => {
                    let res = <div>{token}: {ethers.utils.formatEther(r0)}<br/>HOGE: {ethers.utils.formatEther(r1)}</div>
                    if (token === 'WBNB') {
                        res = <div>{token}: {ethers.utils.formatEther(r1)}<br/>HOGE: {ethers.utils.formatEther(r0)}</div>
                    }
                    return ( <h3>{chain.name} pair<br/><small>{_address}</small><p/>{res}</h3> )
                }
                switch(chain.name?.substring(0,3)) {
                    case 'Eth':
                        r0 = ethers.BigNumber.from(response.result.reserve0)
                        r1 = ethers.BigNumber.from(response.result.reserve1).mul(10**9)
                        return reserves(r0, r1, 'WETH')
                    case 'Bin':
                        r0 = ethers.BigNumber.from(response.result.reserve0).mul(10**9)
                        r1 = ethers.BigNumber.from(response.result.reserve1)
                        return reserves(r0, r1, 'WBNB')
                    case 'Pol':
                        r0 = ethers.BigNumber.from(response.result.reserve0)
                        r1 = ethers.BigNumber.from(response.result.reserve1).mul(10**9)
                        return reserves(r0, r1, 'MATIC')
                    case 'Fan':
                        r0 = ethers.BigNumber.from(response.result.reserve0)
                        r1 = ethers.BigNumber.from(response.result.reserve1).mul(10**9)
                        return reserves(r0, r1, 'FTM')
                  }

                
            }

        }

        const go = async () => {

            await Moralis.start({
                apiKey:  process.env.REACT_APP_MORALIS_API_KEY
                // ...and any other configuration
            })
            .then( async ()=>{
    /*              {makePairLine(EvmChain.create("0x64"), address.xdai.pair)}
                    {makePairLine(EvmChain.create("0x42"), address.okc.pair)}           */
                const pairs = <div className='someBorder'>
                    {await makePairLine(EvmChain.ETHEREUM, address.eth.pair)}<br/>
                    {await makePairLine(EvmChain.BSC, address.bsc.pair)}<br/>
                    {await makePairLine(EvmChain.POLYGON, address.polygon.pair)}<br/>
                    {await makePairLine(EvmChain.FANTOM, address.ftm.pair)}
                </div>

                setPairs(pairs)
            })
            .then(()=>{
                setDone(true)  
            })
            
        }

        function clearStates() {
            setEthBalance(undefined)
            setWait(false)
            setDone(false)
            setPairs(<>{''}</>)
        }

        if (!wait){
            go()
            setWait(true)
            //const min = 60 * 1000
            //window.setTimeout(clearStates, 1*min)

        }
        if (pairs !== undefined) {
            setInfo(
                <div className='someBorder'>
                    <div id='note'>* updates on reload *</div>
                    <div className='infoDiv'>
                        
                        <br/>
                        {pairs}
                    </div>
                </div>
            )
            if (EthBalance!==undefined ) {
                
            }
        }
        
    }, [EthBalance, done, pairs, wait])

    return info
    
}

export default JsonCalc