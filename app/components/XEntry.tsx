import React from 'react'
import '../style/XEntry.css'

type Props = {
    text: string;
    id:string;
    time: string;
}


function XEntry({text , time , id }: Props) {
  return (
    <div className='xentry_card'>
    <div className='xentry_date'>{time}</div>
    <div className='threeButtons'>
    <div className='twoButtons'>
        <button className='summaryButton'>Summary</button>
        <button className='entryButton'>Entry</button>
        </div>
        <div>
            <button className='deleteButton'>del</button>
        </div>
        </div>
    <div className='xentry_box'>
        <div className='xentry_text'>{text}</div>
        </div>
    </div>
  )
}

export default XEntry