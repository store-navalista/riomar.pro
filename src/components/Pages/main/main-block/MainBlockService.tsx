import React, { FC } from 'react'
import { IMainBlock } from '@/types/pages/main'
import ExploreButton from '@/components/UI/btn-explore/ExploreButton'
import st from './MainBlockService.module.scss'

const MainBlockService: FC<{ blocks: IMainBlock[] }> = ({ blocks }) => {
   const letters = 137
   return (
      <>
         {blocks.map((block, i) => {
            const { title, description, href } = block
            return (
               <div key={i} className={st.block}>
                  <span className={st.border} />
                  <div>
                     <h2>{title}</h2>
                  </div>
                  <p>{description.substring(0, letters)}...</p>
                  <ExploreButton href={href} />
               </div>
            )
         })}
      </>
   )
}

export default MainBlockService
