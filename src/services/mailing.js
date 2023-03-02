
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: "maurifabris91@gmail.com",
        pass: "rfmaugreilncdcck"
    }
});

//const contraseña = rfmaugreilncdcck

export default transporter