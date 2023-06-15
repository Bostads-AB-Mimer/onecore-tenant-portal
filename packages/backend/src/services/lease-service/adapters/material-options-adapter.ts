import { MaterialOptionGroup } from '../types'

const getMaterialOptionGroupsByRoomType = async (
  roomTypeId: string
): Promise<Array<MaterialOptionGroup>> => {
  const materialOptionGroups = new Array<MaterialOptionGroup>()

  materialOptionGroups.push({
    materialOptionGroupId: '1',
    roomTypeId: '1',
    type: 'Concept',
    actionName: 'Välj koncept',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Som en sommardröm',
        coverImage: '../../../assets/images/kok_koncept1.png',
      },
      {
        materialOptionId: '2',
        caption: 'Ljust och fräscht',
        coverImage: '../../../assets/images/kok_koncept1.png',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '2',
    roomTypeId: '1',
    type: 'AddOn',
    actionName: 'Tillval',
    materialOptions: [
      {
        materialOptionId: '3',
        caption: 'Diskmaskin',
        shortDescription: '+215 kr/mån',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '3',
    roomTypeId: '2',
    type: 'Concept',
    actionName: 'Välj koncept',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Blue dream',
        coverImage: '../../../assets/images/bad_koncept1.png',
      },
      {
        materialOptionId: '2',
        caption: 'Sommarregn',
        coverImage: '../../../assets/images/bad_koncept1.png',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '4',
    roomTypeId: '2',
    actionName: 'Välj mellan följande',
    type: 'SingleChoice',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Dusch',
      },
      {
        materialOptionId: '2',
        caption: 'Badkar',
        shortDescription:
          'Vid val av badkar är det ej möjligt att välja till tvätt-/kombi-maskin.',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '5',
    roomTypeId: '2',
    actionName: 'Tillval',
    type: 'AddOn',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Tvättmaskin',
        shortDescription: '+265kr/mån',
      },
      {
        materialOptionId: '2',
        caption: 'Kombimaskin',
        shortDescription: '+273kr/mån',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '6',
    roomTypeId: '3',
    name: 'Golv',
    type: 'Concept',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Ekparkett ingår',
        coverImage: '',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '7',
    roomTypeId: '3',
    name: 'Väggar',
    actionName: 'Välj väggfärg',
    type: 'Concept',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Ljusgrå',
        shortDescription: '10002Y',
        coverImage: '',
      },
      {
        materialOptionId: '2',
        caption: 'Beige',
        shortDescription: '20002Y',
        coverImage: '',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '8',
    roomTypeId: '4',
    name: 'Golv',
    actionName: 'Välj golv',
    type: 'Concept',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Ljusgrå linoleum',
        coverImage: '',
      },
      {
        materialOptionId: '2',
        caption: 'Grå linoleum',
        coverImage: '',
      },
    ],
  })

  materialOptionGroups.push({
    materialOptionGroupId: '8',
    roomTypeId: '34',
    name: 'Väggar',
    actionName: 'Välj väggar',
    type: 'Concept',
    materialOptions: [
      {
        materialOptionId: '1',
        caption: 'Ljusgrå',
        shortDescription: '10002Y',
        coverImage: '',
      },
      {
        materialOptionId: '2',
        caption: 'Beige',
        shortDescription: '20002Y',
        coverImage: '',
      },
    ],
  })

  return materialOptionGroups.filter(
    (materialOptionGroup: MaterialOptionGroup) =>
      materialOptionGroup.roomTypeId == roomTypeId
  )
}

export { getMaterialOptionGroupsByRoomType }
