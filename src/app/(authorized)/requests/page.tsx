import RequestedCard from '@/components/requestedCard'
import { getAllReplicaRequests } from '@/lib/actions/getRequestedReplica'
import React from 'react'

const page = async () => {
    const res = await getAllReplicaRequests();
    console.log(res)
  return (
    <div>
      <RequestedCard _id='1' description='Hello' requestedName='hello'  status='not_started' user={{name:"ankit","email":"email"}}/>
    </div>
  )
}

export default page
