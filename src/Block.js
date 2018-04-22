import React from 'react';
import Circle from './Circle';


const statusToColor = {
    'SCHEDULED': 'yellow',
    'DRAFT': 'red',
    'LIVE': 'green'
};
 

export default function Block({title, status, content , updated}) {
    var newdate = Date.parse(updated)
    var testDate = new Date(newdate);
    var UpdateDate  =   testDate.getDate() + "/" + (testDate.getMonth() + 1)+ "/" + testDate.getFullYear();
    const color = statusToColor[status];
    return (
        <div className="block">
            <div className="block-header">
                <Circle color={color} />
                <h2 className="block-title">{title}</h2>

                <div className="block-align-div">
                <span className="block-align-span">{UpdateDate} </span>   
                <span className={`block-status color-${color}`}>{status}</span>  
               </div>
            </div>
            <div className="block-content" dangerouslySetInnerHTML={{ __html: content }}>
            
            </div>
        </div>
    );
}