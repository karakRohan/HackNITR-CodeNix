exports.adminContactNotification = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Contact Form Submission - Enviromat</title>

  <style>
    /* ===== Base Styles ===== */
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #2c5f41;
      background: linear-gradient(
        135deg,
        #a8d5ba 0%,
        #7bc3a3 50%,
        #6ab394 100%
      );
    }

    /* ===== Container ===== */
    .container {
      position: relative;
      max-width: 650px;
      margin: 40px auto;
      padding: 35px;
      background: #ffffff;
      border-radius: 25px;
      border-top: 6px solid #6ab394;
      box-shadow: 0 8px 25px rgba(44, 95, 65, 0.15);
      overflow: hidden;
    }

    .container::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 120px;
      height: 120px;
      background: linear-gradient(45deg, #f4d03f, #f39c12);
      border-radius: 50%;
      opacity: 0.1;
      z-index: 0;
    }

    .container::after {
      content: '';
      position: absolute;
      bottom: -30px;
      left: -30px;
      width: 80px;
      height: 80px;
      background: #7bc3a3;
      border-radius: 50%;
      opacity: 0.1;
      z-index: 0;
    }

    /* ===== Header ===== */
    .header {
      text-align: center;
      margin-bottom: 35px;
      position: relative;
      z-index: 1;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #2c5f41;
      text-shadow: 0 2px 4px rgba(44, 95, 65, 0.1);
    }

    .subtitle {
      font-size: 14px;
      font-weight: 500;
      color: #6ab394;
      margin-bottom: 20px;
    }

    .contact-badge {
      display: inline-block;
      margin-bottom: 15px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      background: linear-gradient(135deg, #6ab394, #7bc3a3);
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(106, 179, 148, 0.3);
    }

    /* ===== Content ===== */
    .info {
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 25px;
      position: relative;
      z-index: 1;
    }

    .info p {
      margin: 15px 0;
      padding: 8px 0;
    }

    .highlight {
      display: inline-block;
      padding: 2px 8px;
      font-weight: 600;
      color: #2c5f41;
      border-radius: 6px;
      background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(106, 179, 148, 0.1) 100%
      );
    }

    /* ===== Message Box ===== */
    .message-box {
      position: relative;
      margin: 20px 0;
      padding: 20px;
      font-style: italic;
      white-space: pre-line;
      background: linear-gradient(135deg, #f8fff8, #f0f9f0);
      border-left: 5px solid #6ab394;
      border-radius: 15px;
      box-shadow: 0 3px 10px rgba(106, 179, 148, 0.1);
      overflow: hidden;
    }

    .message-box::before {
      content: '💬';
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 20px;
      opacity: 0.3;
    }

    /* ===== Footer ===== */
    .footer {
      margin-top: 35px;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #7bc3a3;
      border-top: 2px solid #e8f5e8;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(232, 245, 232, 0.5) 50%,
        transparent 100%
      );
      border-radius: 10px;
      position: relative;
      z-index: 1;
    }

    .eco-accent {
      font-weight: 600;
      background: linear-gradient(120deg, #6ab394, #7bc3a3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nature-elements {
      position: absolute;
      bottom: 10px;
      left: 15px;
      font-size: 12px;
      opacity: 0.3;
      z-index: 0;
    }

    /* ===== Responsive ===== */
    @media (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 25px;
        border-radius: 20px;
      }

      .title {
        font-size: 22px;
      }

      .container::before,
      .container::after {
        display: none;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="nature-elements">🌿 🌱 🍃</div>

    <div class="header">
      <div class="contact-badge">📧 New Inquiry</div>
      <div class="title">🌱 New Contact Form Submission</div>
      <div class="subtitle">
        Sustainable connections for a greener tomorrow
      </div>
    </div>

    <div class="info">
      <p><span class="highlight">Name:</span> ${firstname} ${lastname}</p>
      <p><span class="highlight">Email:</span> ${email}</p>
      <p><span class="highlight">Phone:</span> ${countrycode} ${phoneNo}</p>
      <p><span class="highlight">Message:</span></p>

      <div class="message-box">
        ${message}
      </div>
    </div>

    <div class="footer">
      This is an automated message from
      <span class="eco-accent">Enviromat</span> – Building a sustainable future
      through circular economy.
      <br />
      Please do not reply directly to this email.
      <br />
      <small>🌍 Together, we transform waste into valuable resources</small>
    </div>
  </div>
</body>
</html>
`;
};
