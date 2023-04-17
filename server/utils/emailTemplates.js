const verifyEmailHTML = (name, verificationLink, verificationCode) => `<div
      style="
        max-width: 600px;
        margin: auto;
        background-color: #f4f4f4;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgb(104, 182, 255);
      "
    >
      <div style="background-color: #ffffff; padding: 20px; border-radius: 5px">
        <img
          src="https://raw.githubusercontent.com/nz-m/SocialEcho/main/client/src/assets/SocialEcho.png"
          alt="SocialEcho Logo"
          style="
            display: block;
            margin: auto;
            margin-bottom: 20px;
            max-width: 50%;
          "
        />

        <p
          style="
            font-size: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #4b5563;
          "
        >
          Hi ${name},
        </p>
        <p
          style="
            font-size: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #4b5563;
          "
        >
          Welcome to SocialEcho! Please click the button below to verify your
          email address and activate your account:
        </p>
        <div style="text-align: center; margin-bottom: 20px">
          <a
            href="${verificationLink}"
            style="
              background-color: #3b82f6;
              color: #ffffff;
              padding: 12px 25px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
            "
            >Verify Email Address</a
          >
        </div>
        <p
          style="
            font-size: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #4b5563;
          "
        >
          Alternatively, you can copy and paste the following link in your
          browser:
        </p>
        <p
          style="
            font-size: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #4b5563;
          "
        >
          ${verificationLink}
        </p>
        <p
          style="
            font-size: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #6b7280;
          "
        >
          The link will expire in 30 minutes.
        </p>
        <p
          style="
            font-size: 16px;
            margin-bottom: 15px;
            text-align: center;
            color: #3b82f6;
          "
        >
          Your verification code is: <strong>${verificationCode}</strong>
        </p>
        <p
          style="
            font-size: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #4b5563;
          "
        >
          If you did not create an account, please ignore this email.
        </p>
      </div>
    </div>`;

const verifyLoginHTML = (
  name,
  verificationLink,
  blockLink,
  currentContextData
) => `
          <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <p>Hi ${name},</p>
      <p>Our system has detected that a new login was attempted using the following details:</p>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Time:</strong> ${currentContextData.time}</li>
        <li><strong>IP Address:</strong> ${currentContextData.ip}</li>
        <li><strong>Location:</strong> ${currentContextData.city}, ${currentContextData.country}</li>
        <li><strong>Device:</strong> ${currentContextData.device} ${currentContextData.deviceType}</li>
        <li><strong>Browser:</strong> ${currentContextData.browser}</li>
        <li><strong>Operating System:</strong> ${currentContextData.os}</li>
        <li><strong>Platform:</strong> ${currentContextData.platform}</li>
      </ul>
      <p>If this was you, please click the button below to verify your login.</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #1da1f2; color: #fff; text-decoration: none; border-radius: 5px;">Verify Login</a>
    <p>Alternatively, you can copy and paste the following link into your browser:</p>
    <p>${verificationLink}</p>
    <p>If this was not you, please click the button below to block this login attempt.</p>
    <a href="${blockLink}" style="display: inline-block; padding: 10px 20px; background-color: #1da1f2; color: #fff; text-decoration: none; border-radius: 5px;">Block Login</a>
    <p>Alternatively, you can copy and paste the following link into your browser:</p>
    <p>${blockLink}</p>
    
      <p>Please verify that this login was authorized. If you believe this was an unauthorized attempt, please contact our support team immediately.</p>
    </div>

          `;

module.exports = { verifyEmailHTML, verifyLoginHTML };
