import React from 'react';

import Card from './Card';

const Company = (props) => {
    return (
        <Card>
            <p><span>Company Addres:</span> {props.company.companyAddress}</p>
            <p><span>Company Name:</span> {props.company.companyName}</p>
            <p><span>Total Tokens Bought: </span> {props.company.tokensBought.toNumber()}</p>

            {props.company.influencersHired && props.company.influencersHired.length > 0 && <div>
                <h4>Influencers Hired</h4>
                <ul>
                    <li>{props.company.influencersHired.map(influencer => <p key={influencer}>{influencer}</p>)}</li>
                </ul>
                
            </div>}
            
        </Card>
    );
};

export default Company;