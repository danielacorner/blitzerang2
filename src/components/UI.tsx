import React from 'react'
import { Heart, Coins } from 'lucide-react'

const UI: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 p-4 text-white">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          <span className="text-2xl font-bold">3</span>
        </div>
        <div className="flex items-center">
          <Coins className="w-6 h-6 text-yellow-500 mr-2" />
          <span className="text-2xl font-bold">0</span>
        </div>
      </div>
      {/* Minimap placeholder */}
      <div className="mt-4 w-32 h-32 bg-gray-800 opacity-50 rounded-lg"></div>
    </div>
  )
}

export default UI