import RequestReplica from '@/components/requestReplica'
import { auth } from '@/lib/auth';
import React from 'react'

const page = async() => {
  const session = await auth();
  return (
    <div>
      <RequestReplica userId={session?.user.id}/>
    </div>
  )
}

export default page
