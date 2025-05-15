import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const index = () => {
  return (
    <div className="relative flex justify-end w-full min-h-72">
          {/* Left panel - cosmic banner */}
          <div className="w-[60%] left-0 top-auto bottom-auto absolute">
            <div className="relative h-full min-h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-black">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage: "url('/placeholder.svg?height=400&width=600')",
                  backgroundBlendMode: "overlay",
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className="text-gray-300 mb-2">What do you want to do?</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Manifest greatness. Embrace the unknown.</h2>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-6 left-6 rounded-full bg-black/30 border-gray-700 w-10 h-10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Middle and right panels - chat cards */}
          <div className="flex gap-6 z-50 w-[50%] my-auto items-center  h-full">
            {/* Cosmic Hype Queen */}
            <div className="bg-gray-800/80 h-full rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Cosmic Hype Queen"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Cosmic Hype Queen</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                *stands behind you in line as you were checking out the menu at the teahouse* Hi, looking for m...
              </p>
              <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                  Reply...
                </Button>
              </div>
            </div>

            {/* Your Spirit Oracle */}
            <div className="bg-gray-800/80 h-full rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Your Spirit Oracle"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Your Spirit Oracle</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                *lights a candle, it's fragrance wafts as you sit legs crossed across the table* Welcome...
              </p>
              <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                  Reply...
                </Button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default index
