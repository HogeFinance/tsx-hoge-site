import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import './info.css'
import { abi, address } from './info'
import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

const JsonCalc = () => {
    const [info, setInfo] = useState<JSX.Element>(<>{''}</>)
    const [pairs, setPairs] = useState<JSX.Element>()
    const [wait, setWait] = useState<boolean>(false)

    useEffect( () => {
        const makePairLine = async (_chain:EvmChain, _address:string, _abi?:any) => {
            let total = 0
            if (_abi!==undefined) {
                const options = {
                    abi: _abi,
                    functionName: "totalSupply",
                    address: _address,
                    chain: _chain
                }
                const tx = await Moralis.EvmApi.utils.runContractFunction(options)
                total = parseFloat(ethers.utils.formatEther(tx.result))
                console.log(_chain.name, "LP token totalSupply():", total)
            }
            const chain = _chain;
            const pairAddress = _address;
            const reserves = await Moralis.EvmApi.defi.getPairReserves({
                pairAddress,
                chain,
            });

            
            if (reserves.result.reserve0 !== undefined && reserves.result.reserve1 !== undefined) {
                
                const makeLine = (_token:any, _hoge:any, _tokenName:string) => {
                    const token = parseFloat(ethers.utils.formatEther(_token))
                    const hoge = parseFloat(ethers.utils.formatEther(_hoge))
                    let LPhoge:any = (hoge / total) * 2
                    if (total === 0) { LPhoge = 'needs more info'}
                    console.log(_tokenName, "Hoge Voting Power per LP token:", LPhoge)
                    const res = <div>
                            {_tokenName}: {token.toFixed(9)}
                            <br/>
                            HOGE: {hoge.toLocaleString()}
                        </div>
                    return ( 
                        <h3>
                            {chain.name} pair address<br/>
                            <small>{_address}</small><p/>
                            {res}<p/>
                            Hoge voting power per LP token:<br/>
                            {LPhoge.toLocaleString()}
                        </h3>
                    )
                }
                let r0, r1
                switch(chain.name?.substring(0,3)) {
                    case 'Eth':
                        r0 = ethers.BigNumber.from(reserves.result.reserve0)
                        r1 = ethers.BigNumber.from(reserves.result.reserve1).mul(10**9)
                        return makeLine(r0, r1, 'WETH')
                    case 'Bin':
                        r0 = ethers.BigNumber.from(reserves.result.reserve0).mul(10**9)
                        r1 = ethers.BigNumber.from(reserves.result.reserve1)
                        return makeLine(r1, r0, 'WBNB')
                    case 'Pol':
                        r0 = ethers.BigNumber.from(reserves.result.reserve0)
                        r1 = ethers.BigNumber.from(reserves.result.reserve1).mul(10**9)
                        return makeLine(r0, r1, 'MATIC',)
                    case 'Fan':
                        r0 = ethers.BigNumber.from(reserves.result.reserve0)
                        r1 = ethers.BigNumber.from(reserves.result.reserve1).mul(10**9)
                        return makeLine(r0, r1, 'FTM')
                }
            }
        }

        const go = async () => {
            await Moralis.start({
                apiKey:  process.env.REACT_APP_MORALIS_API_KEY
                // ...and any other configuration
            })
            .then( async () => {
                const pairs = <div className='someBorder'>
                    {await makePairLine(EvmChain.ETHEREUM, address.eth.pair, abi.eth.pair)}<br/>
                    {await makePairLine(EvmChain.BSC, address.bsc.pair, abi.bsc.pair)}<br/>
                    {await makePairLine(EvmChain.POLYGON, address.polygon.pair, abi.polygon.pair)}<br/>
                    {await makePairLine(EvmChain.FANTOM, address.ftm.pair)}
                </div>
    /*              {await makePairLine(EvmChain.create("0x64"), address.xdai.pair)}
                    {await makePairLine(EvmChain.create("0x42"), address.okc.pair)}           */
                setPairs(pairs)
            })
        }

        if (!wait){
            go()
            setWait(true)
        }

        if (pairs !== undefined) {
            setInfo(
                <div className='someBorder'>
                    <div id='note'>* updates on reload *</div>
                    <div className='infoDiv'>
                        <br/>{pairs}
                    </div>
                </div>
            )
        }
        
    }, [pairs, wait])

    return info
}

export default JsonCalc