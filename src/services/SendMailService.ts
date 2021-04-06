import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailService {
  private client: Transporter

  constructor () {
    const mailConfig = nodemailer.createTransport({
      host: `${process.env.MAILHOST}`,
      port: Number(process.env.MAILPORT),
      auth: {
        user: `${process.env.MAILUSER}`,
        pass: `${process.env.MAILPASS}`
      }
    })

    this.client = mailConfig
  }

  async execute (to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse(variables)

    await this.client.sendMail({
      to,
      subject,
      html,
      from: 'gabrielcordeiro359@gmail.com'
    })
  }
}

export default new SendMailService()
