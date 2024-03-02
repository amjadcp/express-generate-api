export const resetLinkEmailTemplate = (tempData: {
    username: string;
    resetLink: string;
}): string => {
    return `
<!DOCTYPE html>
<html>

<head>
<style>
.center {
display: block;
margin-left: auto;
margin-right: auto;
}

.email-container {
max-width: 600px;
padding: 24px;
gap: 40px;
flex-shrink: 0;
border-radius: 8px;
border: 1px solid var(--Purple-purple-100, #E8D1FF);
background: #FFF;
}

pre {
align-self: stretch;
color: var(--Grey-grey-400, #5C5C5C);
font-family: Trip Sans;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

h2 {
align-self: stretch;
color: var(--Grey-grey-400, #5C5C5C);
font-family: Trip Sans;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: normal;
}

.link {
padding: 15px 24px;
border-radius: 8px;
background: var(--Primary, #9747FF);
box-shadow: 0px 4px 10px 0px #DDBAFF;
color: #FFF;
font-family: Trip Sans;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
text-decoration: none;
display: block;
margin-left: auto;
margin-right: auto;
width: fit-content;
}
</style>
</head>

<body>
<div class="email-container">

<img src="https://drive.google.com/uc?export=download&id=1LBLvhI-AtKvQwvK0xwzaNt4oBSDmD_qg"
alt="BookItBoss Logo" width="30%" class="center">
<h2>
Reset Password
</h2>
<pre>
Dear ${tempData.username},
We received a request to reset the password for your account associated with this email address. 
If you made this request, please click on the link below to reset your password:
</pre>
<a href="${tempData.resetLink}" class="link" style="color: #FFF;">
Reset Password
</a>
<pre>
If you didn't request a password reset, please ignore this email or contact our support team if you have any concerns.
You can reach us at bookitboss@tghtech.com

Thank you,
Team BookItBoss
</pre>
</div>
</body>

</html>
    `;
};


export const verifyLinkEmailTemplate = (tempData: {
    username: string;
    verifyLink: string;
}): string => {
    return `
<!DOCTYPE html>
<html>

<head>
<style>
.center {
display: block;
margin-left: auto;
margin-right: auto;
}

.email-container {
max-width: 600px;
padding: 24px;
gap: 40px;
flex-shrink: 0;
border-radius: 8px;
border: 1px solid var(--Purple-purple-100, #E8D1FF);
background: #FFF;
}

pre {
align-self: stretch;
color: var(--Grey-grey-400, #5C5C5C);
font-family: Trip Sans;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

h2 {
align-self: stretch;
color: var(--Grey-grey-400, #5C5C5C);
font-family: Trip Sans;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: normal;
}

.link {
padding: 15px 24px;
border-radius: 8px;
background: var(--Primary, #9747FF);
box-shadow: 0px 4px 10px 0px #DDBAFF;
color: #FFF;
font-family: Trip Sans;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
text-decoration: none;
display: block;
margin-left: auto;
margin-right: auto;
width: fit-content;
}
</style>
</head>

<body>
<div class="email-container">

<img src="https://drive.google.com/uc?export=download&id=1LBLvhI-AtKvQwvK0xwzaNt4oBSDmD_qg"
alt="BookItBoss Logo" width="30%" class="center">
<h2>
Verify Your Account
</h2>
<pre>
Dear ${tempData.username},
We received a request to verify your account associated with this email address. 
If you made this request, please click on the link below to verify your account:
</pre>
<a href="${tempData.verifyLink}" class="link" style="color: #FFF;">
Verify Account
</a>
<pre>
If you didn't request account verification, please ignore this email or contact our support team if you have any concerns.
You can reach us at bookitboss@tghtech.com

Thank you,
Team BookItBoss
</pre>
</div>
</body>

</html>
    `;
};