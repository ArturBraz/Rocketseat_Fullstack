//Global type extends Request of Express
declare namespace Express {
  export interface Request{
    user?: {
      id: string
      role: string
    }
  }
}