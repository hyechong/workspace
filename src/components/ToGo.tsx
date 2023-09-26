import React from 'react'
import { useRecoilState} from 'recoil'
import { IToGo, toGoState } from '../atoms'

const ToGo = ({text, id, category}:IToGo) => {
  const [toGos,setToGos] = useRecoilState(toGoState);
  const onClick=(newCategory:IToGo['category'])=>{
    setToGos((oldToGos)=>{
      const targetIndex = oldToGos.findIndex((toGo)=>toGo.id===id);
      const oldToGo = oldToGos[targetIndex];
      const newToGo = {text, id, category:newCategory}
      console.log(oldToGo,newToGo);
      return[
        ...oldToGos.slice(0,targetIndex),newToGo,...oldToGos.slice(targetIndex+1),
      ]
    })
  }
  const handleDelete = ()=>{
    const target = toGos.findIndex(toGo=>toGo.id===id)
    const newToGos =[...toGos]
    newToGos.splice(target,1)
    setToGos(newToGos)
  }
  return (
    <li>
      <span>{text}</span>
      {category === 'TO_GO'&&(
        <>
          <button onClick={()=>onClick('WENT')}>✅</button>
          <button onClick={handleDelete}>🗑️</button>
        </>
      )}
      {category === 'WENT'&&(
        <>
          <button onClick={()=>onClick('LIKE')}>👍</button>
          <button onClick={()=>onClick('TO_GO')}>❌</button>
        </>
      )}
      {category === 'LIKE'&&(
        <>
          <button onClick={()=>onClick('WENT')}>👎</button>
        </>
      )}
    </li>
  )
}

export default ToGo