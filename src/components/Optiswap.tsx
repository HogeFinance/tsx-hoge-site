
import React from "react"

const OptiSwap = () => {
    const optiswap = 'https://optiswap.pro/#swap/0xfAd45E47083e4607302aa43c65fB3106F1cd7607'
    const groupLP = 'https://optiswap.pro/#pool/0xfAd45E47083e4607302aa43c65fB3106F1cd7607'
    const otcswap = 'https://otcswap.pro/'
    const optivaults = 'https://optiswap.pro/#vault/0xfAd45E47083e4607302aa43c65fB3106F1cd7607/0xB282B19A9028482BEADEED12133F657B7993f825'

    return (
        <h2 id='optiswap'>
            <a href='https://optiswap.pro/' target='_blank' rel="noreferrer">OptiSwap.Pro</a><p/>
            <a href={optiswap} target='_blank' rel="noreferrer">OptiSwap</a><br/>
            <a href={groupLP} target='_blank' rel="noreferrer">GroupLP</a><br/>
            <a href={otcswap} target='_blank' rel="noreferrer">OTCswap</a><br/>
            <a href={optivaults} target='_blank' rel="noreferrer">OptiVaults</a><br/>
        </h2>
    )
}

export default OptiSwap


