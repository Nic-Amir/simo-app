import React from 'react'
import {subscribeTicks, unsubscribeTicks} from '../../services/derivapi-service' 

const TickSubscriber = () => {



  const handleSubsribce = (tick) => {
    console.log("subscribed to: ", tick);
    subscribeTicks({
      ticks_history: tick,
      adjust_start_time: 1,
      count: 10,
      end: 'latest',
      start: 1,
      style: 'ticks',
    })
  }

  const handleUnsubscribe = (tick) => {
    console.log("unsubscribed form: ", tick);
    unsubscribeTicks({
      ticks_history: tick,
      adjust_start_time: 1,
      count: 10,
      end: 'latest',
      start: 1,
      style: 'ticks',
    })
  }

  return (
      <div>
          <button onClick={()=>handleSubsribce('R_50')}>Subscribe R_50</button>
          <button onClick={() => handleUnsubscribe('R_50')}>Unsubscribe R_50</button>
          

          <button onClick={()=>handleSubsribce('R_75')}>Subscribe R_75</button>
          <button onClick={()=>handleUnsubscribe('R_75')}>Unsubscribe R_75</button>
    </div>
  )
}

export default TickSubscriber