import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) { return res.status(401).json({ error: 'No token provided' }) }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) { return res.status(401).json({ error: 'Token error' }) }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).json({ error: 'Malformatted token' }) }

  jwt.verify(token, `${process.env.SECRET}`, (err, decoded) => {
    if (err) { return res.status(401).json({ error: 'Token invalid' }) }
    req.params.userId = decoded.id
    return next()
  })
}
