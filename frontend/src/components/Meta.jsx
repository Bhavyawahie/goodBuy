import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
                <meta name='description'content={description}/>
                <meta name='keyword'content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title : "GoodBuy: Shop Online For Deals & Save!",
    description: "GoodBuy! Buy The Goods at cheap on GoodBuy",
    keywords: "electronics, cheap electronics, buy cheap electronics, buy cheap electronics online "
}

export default Meta
