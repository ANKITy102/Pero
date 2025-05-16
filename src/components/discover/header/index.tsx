import { Input } from '@/components/ui/input'
import { auth } from '@/lib/auth';
import { Search } from 'lucide-react'
import React from 'react'

const index = async() => {
    const session = await auth();
    
  return (
    <div className="flex items-center justify-between mb-8">
          <div className="flex  flex-col justify-center gap-3">
            <div className="text-gray-400">Welcome back,</div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full text-sm bg-green-600 flex items-center justify-center text-white">{session?.user.name[0]}</div>
              <div className="font-medium text-xl">{session?.user.name}</div>
            </div>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="w-full bg-gray-800/50 border-none pl-10 text-gray-300 placeholder:text-gray-500 rounded-full"
              placeholder="Search"
            />
          </div>
        </div>
  )
}

export default index
