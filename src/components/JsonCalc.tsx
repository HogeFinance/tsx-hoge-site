import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import './info.css'
import { ABI, ADDRESS, URL }  from './info'

class OnchainContract {
    provider;
    contract;
    
    constructor(rpcUrl:string, contractAddress:string, ABI:any[]) {
        try {
            this.provider = new ethers.JsonRpcProvider(rpcUrl);
            this.contract = new ethers.Contract(contractAddress, ABI, this.provider)
        } catch (error) { console.error(error)}
    }
}

const EthPair = new OnchainContract(URL.ethRPC, ADDRESS.eth.pair, ABI.eth.pair);
const BscPair = new OnchainContract(URL.bscRPC, ADDRESS.bsc.pair, ABI.bsc.pair);
const PolygonPair = new OnchainContract(URL.polygonRPC, ADDRESS.polygon.pair, ABI.polygon.pair);
//const FtmPair = new OnchainContract(ftmRPC, ADDRESS.ftm.pair, ABI.ftm.pair)

const EthHoge = new OnchainContract(URL.ethRPC, ADDRESS.eth.hoge, ABI.eth.hoge);
const BscHoge = new OnchainContract(URL.bscRPC, ADDRESS.bsc.hoge, ABI.bsc.hoge);
const PolygonHoge = new OnchainContract(URL.polygonRPC, ADDRESS.polygon.hoge, ABI.polygon.hoge);

const JsonCalc = () => {
    const [info, setInfo] = useState<JSX.Element>(<>{''}</>)
    const [pairs, setPairs] = useState<JSX.Element>()
    const [wait, setWait] = useState<boolean>(false)
    const [inputAddress, setInputAddress] = useState<string>();
    const [holderInfo, setHolderInfo] = useState<JSX.Element>(<></>)

    useEffect( () => {
        
        async function clickHandle() { 
            if (inputAddress !== undefined) {
                const formatLp = async (pair: OnchainContract) => {
                    return await pair.contract?.balanceOf(inputAddress).then((val)=>{
                            return  parseFloat(ethers.formatEther(val)).toFixed(3)
                        }).then(async (bal)=>{
                            return bal?.concat( ' ', await pair.contract?.name(), ' LP tokens' )
                        }) || '??'
                }                    
                const formatHoge = async (hoge:OnchainContract) => {
                    if (hoge.contract !== undefined) {
                        return await hoge.contract.balanceOf(inputAddress).then((val)=>{
                            return parseInt((parseFloat(ethers.formatEther(val)) * 10**9).toString())
                        }).then( (bal)=>{
                            if (hoge.provider !== undefined) {
                                return bal.toLocaleString().concat(' ', hoge.provider._network.name,' Hoge')
                            } else { return '??' }
                        })
                    } else { return '??' }
                }
                setHolderInfo( <h6>
                    {await formatHoge(EthHoge)}<br/>   
                    {await formatLp(EthPair)} <p/>
                    {await formatHoge(BscHoge)}<br/>  
                    {await formatLp(BscPair)} <p/>
                    {await formatHoge(PolygonHoge)}<br/>
                    {await formatLp(PolygonPair)}
                </h6> )
                
            } else { alert('input valid address') }
        }

        async function changeHandle (e: { currentTarget: { value: React.SetStateAction<string | undefined>; }; }) {
            const val = e.currentTarget.value
            if (val !== undefined && 
                val?.length === 42 &&  
                ethers.isAddress(val) ) 
            { setInputAddress(val) } else { setInputAddress(undefined); setHolderInfo(<></>) }
        }    

        const makePairLine = async (_pair:OnchainContract) => {
            let name:string
            let address:string
            let totalSupply = 0
            let reserves:bigint[]
            let r0:bigint, r1:bigint;
    
            if (_pair.contract!==undefined) {
                //totalHoge = await _pair.contract.balancOf(_hoge);
                //totalHoge = parseFloat(ethers.formatEther(totalHoge)) // 10**9
                name = await _pair.contract.name()
                address = await _pair.contract.getAddress()
                totalSupply = await _pair.contract.totalSupply();
                totalSupply = parseFloat(ethers.formatEther(totalSupply))
                reserves = await _pair.contract.getReserves();
                r0 = reserves[0]
                r1 = reserves[1]    
                if (r0 !== undefined && r1 !== undefined) {
                    const makeLine = (_token:any, _hoge:any, _tokenName:string) => {
                        const token = parseFloat(ethers.formatEther(_token))
                        const hoge = parseFloat(ethers.formatEther(_hoge))
                        let LPhoge:any = (hoge / totalSupply) * 2
                        if (totalSupply === 0) { LPhoge = 'needs more info'}
                        console.log(_tokenName, "Hoge Voting Power per LP token:", LPhoge)
                        const pairInfo = <div>
                                {_tokenName}: {token.toFixed(9)}
                                <br/>
                                HOGE: {hoge.toLocaleString()}
                            </div>
                        return ( 
                            <h3>
                                {name} pair address<br/>
                                <small>{address}</small>
                                <p/>
                                {pairInfo}<p/>
                                Hoge voting power per LP token:<br/>
                                {LPhoge.toLocaleString()}<br/>
                            </h3>
                        )
                    }
                    switch(name?.substring(0,3)) {
                        case 'Uni':
                            r1 = r1 * ethers.toBigInt(10**9)
                            return makeLine(r0, r1, 'WETH')
                        case 'Pan':
                            r0 =  r0 * ethers.toBigInt(10**9)
                            return makeLine(r1, r0, 'WBNB')
                        case 'Sus':
                            r1 = r1 * ethers.toBigInt(10**9)
                            return makeLine(r0, r1, 'MATIC',)
                        case 'Fan':
                            r1 = r1 * ethers.toBigInt(10**9)
                            return makeLine(r0, r1, 'FTM')
                    }
                }
            }
        }
        const go = async () => {
            const pairs = <div className='someBorder'>
                {await makePairLine(EthPair)}<br/>
                {await makePairLine(BscPair)}<br/>
                {await makePairLine(PolygonPair)}<br/>
                
            </div>
            setPairs(pairs)
        }
        
        if (!wait){
            go()
            setWait(true)
        }
    
        if (pairs !== undefined) {
            setInfo(<>
                    <input className='inputBox' placeholder={"Address to check"}
                        onChange={changeHandle} />
                    <button className='voteButton' onClick={clickHandle}>
                        check voting power</button>
                    {holderInfo}
                    <div className='someBorder'>
                        <div id='note'>* updates on reload *</div>
                        <div className='infoDiv'>
                            <br/>{pairs} 
                        </div>                    
                    </div>
                </>
            )
        }
        
    }, [wait, pairs, inputAddress, holderInfo])

    return info
}

export default JsonCalc