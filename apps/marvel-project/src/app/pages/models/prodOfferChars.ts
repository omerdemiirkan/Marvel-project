import {CharValueList} from "./charValueList";


export interface ProdOfferChars{
  charId?: number
  name?: string
  shortCode?: string
  isActive?: boolean
  selectedCharValue?:CharValueList[],
  charValueList?:CharValueList[]
}
