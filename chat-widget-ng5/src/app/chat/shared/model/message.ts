import { ActionType } from "../../enums/actionTypeEnum";

export class Message {
  user = ''
  text = ''
  buttons: Replies[] = []
  attachment:any
}

export class Replies {
  type = ''
  title = ''
  payload = ''
  action = ''
}

export interface UiMessage {
  from: any
  text: string
  type: string
  date: number
  fileTypeId: number 
  fileUploadedUrl :string
  actionType: ActionType
  actions: any 

}
