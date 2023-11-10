const nodemailer = require('nodemailer')



const sendEmail = async(req,res) =>{
    const {name,doctor,email} = req.body
    console.log(email)
    let config = {
        service : 'gmail',
        auth : {
            user:'riteshrai747@gmail.com',
            pass: 'vrvo clvn rjlq opdb'
        },
        secure:true,
        tls: {
            rejectUnauthorized: false // accept self-signed certificates
        }
    }

    let transporter = nodemailer.createTransport(config)

  let message = {
      from: 'Prashanti Diagnostics Center', // sender address
      to: `riteshrai747@gmail.com`, // list of receivers
      subject: `Hello, ${name}`, // Subject line
      text: `Your Booking for ,${doctor} has been confirmed.Please visit the clinic today itself `, // plain text body
      html: "<b>Your Booking has been confirmed.Please visit the clinic today itself </b>", // html body
    }


  transporter.sendMail(message).then((info) => {
      return res.status(201)
      .json({ 
          msg: "you should receive an email",
          info : info.messageId,
          preview: nodemailer.getTestMessageUrl(info)
      })
  }).catch(error => {
    console.log(error)
      return res.status(500).json({ error,msg:'chalena' })
  })
}

module.exports = sendEmail