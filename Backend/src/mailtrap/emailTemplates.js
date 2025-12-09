export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Password Reset Successful</title>
	</head>
	<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;	padding: 20px;">
		<div style="background: linear-gradient(to right, #4caf50, #45a049); padding: 20px; text-align: center;">
			<h1 style="color: white; margin: 0">Welcome To Thinkboard, {name}</h1>
		</div>
		<div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
			<div style="max-width: 600px;	margin: 20px auto; padding: 20px; border: 1px solid #dddddd; border-radius: 8px;">
				<p>Hi {name},</p>
				<p>Welcome aboard! We're thrilled to have you join the <strong>Thinkboard</strong> community.</p>
				<p>
					ThinkBoard is designed to be your personal space for capturing, organizing, and evolving your ideas, whether you're brainstorming a new project, mapping out a study plan, or just jotting down a sudden burst of inspiration.
				</p>
				<div style="margin-top: 30px;	padding: 15px; background-color: #f4f4f4; border-radius: 4px;">
					<h2 style="color: #555555; font-size: 18px; margin-top: 0">	🚀 What to do next:	</h2>
					<ul style="list-style-type: none; padding: 0">
						<li style="margin-bottom: 10px">
							<strong>1. Create your first Board:</strong> Click the 
              <a href="[]" style="color: #45a049; text-decoration: none; font-weight: bold"> "Create New Note" button </a> and give your first project a name.
						</li>
						<li style="margin-bottom: 10px"><strong>2. Add your first "Thought":</strong> Boards are made up of Thoughts—mini notes, tasks, or links. Start dropping them in!
						</li>
						<li style="margin-bottom: 0"><strong>3. Explore the power of linking:</strong><i>(Coming soon..)</i> ThinkBoard shines when you connect related
							Thoughts across different boards.
						</li>
					</ul>
				</div>
				<p style="margin-top: 30px"></p>	If you ever get stuck or have a suggestion, our support team is just an email away at
					<a href="mailto:[Support Email Address]" style="color: #45a049; text-decoration: none"> [Support Email Address] </a>.
				</p>
				<p>Happy thinking!</p>
				<p style="margin-top: 20px">Best regards,<br /> The ThinkBoard Team </p>
				<div style=" margin-top: 40px; padding-top: 10px;
						border-top: 1px solid #eeeeee; text-align: center; font-size: 12px; color: #999999;">
					<p>	<a href="[Your Website/App Link]" style="color: #999999; text-decoration: none"	>ThinkBoard Website</a>|
						<a href="[Unsubscribe Link]" style="color: #999999; text-decoration: none"> Unsubscribe </a>
					</p>
					<div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
						<p>This is an automated message, please do not reply to this email.</p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
`;
