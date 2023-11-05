import React from 'react'

interface StrongItemProps {
    children: any;
  }

const StrongItem: React.FC<StrongItemProps> = ({children}) => {
  return (
    <strong className='text-red-800  '>
        {children}
    </strong>
  )
}

export default StrongItem