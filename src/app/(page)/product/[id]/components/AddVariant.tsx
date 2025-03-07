import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

type Props = {}

const AddVariant = ({ onClick }: {
  onClick: (text: string) => void
}) => {
  const [text,setText] = useState<string>("");
  return (
    <div className='flex flex-col gap-5'>
      <Input placeholder='Key' onChange={(e) => setText(e.target.value)}/>
      <Button className='ml-auto' onClick={() => onClick(text)}>Add</Button>
    </div>
  )
}

export default AddVariant