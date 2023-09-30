import React from 'react'
import "../style/ExploreCard.css";


type Props = {
    bg: string;
}
function ExploreCard({bg}:Props) {
    const cn = `explorecard ${bg}`

  return (
     <div className='size'><div className={cn}><div className='text'>{bg} journal</div></div></div>
 
  )
}

export default ExploreCard