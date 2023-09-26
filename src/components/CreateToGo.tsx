import React from 'react'
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toGoState } from '../atoms';

interface IForm {
  [key:string]:string;
}

const CreateToGo = () => {
  const setToGos = useSetRecoilState(toGoState);

  const {register, handleSubmit, setValue, formState} = useForm<IForm>();

  const handleValid=({toGo}:IForm)=>{
    setToGos((oldToGos)=>[
      {text:toGo, id:Date.now(), category:'TO_GO'},
      ...oldToGos,
    ])
    setValue('toGo', '');
  }

  const ERROR = formState.errors.toGo;
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register('toGo',{
        required:'😠 required!'
      })}
      placeholder='이름' 
      />
      <span>{ERROR?.message}</span>
      <button>가자!</button>
    </form>
  )
}

export default CreateToGo