"use client"
import Chat from '@/components/shared/Chat'
import Header from '@/components/shared/Header'


const AddTransformationtypePage = ({ params: { type } }: SearchParamProps) => {

  return (
    <div>
      <Header 
        title="Réclamation" 
        subtitle=""
      />
      <Chat />
    </div>
  )
}

export default AddTransformationtypePage