import { Response } from 'express'

export interface Controller {
  index(request: Request, esponse: Response): Promise<Response>
}
