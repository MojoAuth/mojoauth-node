## Version 1.3.2
- Added phone otp functions `mojoAPI.signinWithPhoneOTP`, `mojoAPI.resendPhoneOTP` and `mojoAPI.verifyPhoneOTP`

## Version 1.3.1
- Added decoded jwt token value in the response object as  `profile` for  `mojoAPI.verifyToken`.

## Version 1.3.0

- Renamed `mojoAPI.verifyOtp` to `verifyEmailOTP`, retaining a deprecated `verifyOtp` alias to prevent breaking changes.
- Added  query parameter in  `mojoAPI.signinWithMagicLink` and `mojoAPI.signinWithEmailOTP`  to pass `language` and `redirect_url` query parameter name.
- Added  resend function for both magiclink and email OTP  `mojoAPI.resendMagicLink` and `mojoAPI.resendhEmailOTP`.

## Version 1.2.0

- Enabled use of MojoAuth API secret.
- Renamed `mojoAPI.pingStaus` to `pingStatus`, retaining a deprecated `pingStaus` alias to prevent breaking changes.
- Fixed `mojoAPI.pingStatus` to use the correct `state_id` query parameter name.


## Version 1.0.0
Released on **March 23, 2021**
 - Added MojoAuth APIs

See the documentation [here](https://mojoauth.com/docs/)