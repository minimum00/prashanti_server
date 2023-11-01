const nodemailer = require('nodemailer')



const sendEmail = async(req,res) =>{
    const {name,doctor} = req.body
    console.log(doctor)
    let config = {
        service : 'gmail',
        auth : {
            user:'riteshrai747@gmail.com',
            pass: 'vrvo clvn rjlq opdb'
        }
    }

    let transporter = nodemailer.createTransport(config)

  let message = {
      from: 'Prashanti Diagnostics Center', // sender address
      to: "riteshrai747@gmail.com", // list of receivers
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
      return res.status(500).json({ error })
  })
}

module.exports = sendEmail