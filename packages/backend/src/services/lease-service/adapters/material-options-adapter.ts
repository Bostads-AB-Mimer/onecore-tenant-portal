import { MaterialOption, MaterialOptionGroup } from '../types'

const getMaterialOption = async (
  roomTypeId: string,
  materialOptionGroupId: string,
  materialOptionId: string
): Promise<MaterialOption | undefined> => {
  let materialOption: MaterialOption | undefined
  let groups = await getMaterialOptionGroupsByRoomType(roomTypeId)

  groups
    .filter(
      (group: MaterialOptionGroup) =>
        group.materialOptionGroupId == materialOptionGroupId
    )
    .forEach((group: MaterialOptionGroup) => {
      materialOption = group.materialOptions?.find(
        (option: MaterialOption) => option.materialOptionId == materialOptionId
      )
    })

  return materialOption
}

const getMaterialOptionGroup = async (
  roomTypeId: string,
  materialOptionGroupId: string
): Promise<MaterialOptionGroup | undefined> => {
  let groups = await getMaterialOptionGroupsByRoomType(roomTypeId)

  return groups.find(
    (materialOptionGroup: MaterialOptionGroup) =>
      materialOptionGroup.materialOptionGroupId == materialOptionGroupId
  )
}

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
        caption: 'Koncept 1',
        coverImage: '../../../assets/images/kok_koncept1.png',
      },
      {
        materialOptionId: '2',
        caption: 'Koncept 2',
        coverImage: '../../../assets/images/kok_koncept2.png',
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
        caption: 'Koncept 1',
        coverImage: '../../../assets/images/bad_koncept1.png',
      },
      {
        materialOptionId: '2',
        caption: 'Koncept 2',
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
        coverImage: '../../../assets/images/vagg_ljusgra.png',
      },
      {
        materialOptionId: '2',
        caption: 'Varmvit',
        shortDescription: '20002Y',
        coverImage: '../../../assets/images/vagg_varmvit.png',
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
        coverImage: '../../../assets/images/golv_ljusgra.png',
      },
      {
        materialOptionId: '2',
        caption: 'Beige linoleum',
        coverImage: '../../../assets/images/golv_beige.png',
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
        coverImage: '../../../assets/images/vagg_ljusgra.png',
      },
      {
        materialOptionId: '2',
        caption: 'Varmvit',
        shortDescription: '20002Y',
        coverImage: '../../../assets/images/vagg_varmvit.png',
      },
    ],
  })

  return materialOptionGroups.filter(
    (materialOptionGroup: MaterialOptionGroup) =>
      materialOptionGroup.roomTypeId == roomTypeId
  )
}

export {
  getMaterialOptionGroupsByRoomType,
  getMaterialOptionGroup,
  getMaterialOption,
}
