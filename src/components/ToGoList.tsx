import React from 'react'
import { useRecoilValue } from 'recoil'
import { toGoSelector } from '../atoms'
import CreateToGo from './CreateToGo'
import ToGo from './ToGo'

const ToGoList = () => {
  const [toGo, went, like]=useRecoilValue(toGoSelector)
  console.log(toGo, went, like);
  return (
    <div>
      <CreateToGo/>
      <ul>
        {toGo.map((toGo)=>(
          <ToGo key={toGo.id} {
            ...toGo
          }/>
        ))}
      </ul>
      <h2>내가 가본 나라들</h2>
      <ul>
        {went.map((toGo)=>(
          <ToGo key={toGo.id} {
            ...toGo
          }/>
        ))}
      </ul>
      <h2>내가 좋아하는 나라들</h2>
      <ul>
        {like.map((toGo)=>(
          <ToGo key={toGo.id} {
            ...toGo
          }/>
        ))}
      </ul>
    </div>
  )
}

export default ToGoList