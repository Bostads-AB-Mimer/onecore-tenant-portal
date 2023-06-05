import axios from 'axios'

import { MaterialOption } from '../types'

const getMaterialOptionsByRoomType = async (
  roomTypeId: string
): Promise<Array<MaterialOption>> => {
  return [
    {
      materialOptionId: '1',
      roomTypeId,
      caption: 'Koncept 1',
      shortDescription: '',
      image: '',
      detailsUrL: '',
      type: 'Concept',
      status: 'Active',
    },
    {
      materialOptionId: '2',
      roomTypeId,
      caption: 'Koncept 2',
      shortDescription: '',
      image: '',
      detailsUrL: '',
      type: 'Concept',
      status: 'Active',
    },
    {
      materialOptionId: '3',
      roomTypeId,
      caption: 'Diskmaskin',
      shortDescription: '',
      image: '',
      detailsUrL: '',
      type: 'AddOn',
      status: 'Active',
    },
  ]
}

export { getMaterialOptionsByRoomType }
