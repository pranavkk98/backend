const keys = {};
if (process.env.NODE_ENV === "PROD") {
  keys.dbConnection = process.env.DB_CONNECTION_PROD;
  keys.emailId = process.env.EMAIL_ID_PROD;
  keys.emailPass = process.env.EMAIL_PASSWORD_PROD;
  keys.emailServer = process.env.EMAIL_SERVER_PROD;
  keys.emailServerPort = process.env.EMAIL_SERVER_PORT_PROD;
  keys.storeName = process.env.STORE_NAME_PROD;
  keys.frontEndBaseUrl = process.env.FRONTEND_BASE_URL_PROD;
  keys.jwtSecret = process.env.JWT_SECRET_PROD;
  keys.cdnryCloudName = process.env.CLOUDINARY_CLOUD_NAME_PROD;
  keys.cdnryApiKey = process.env.CLOUDINARY_API_KEY_PROD;
  keys.cdnryApiSecret = process.env.CLOUDINARY_API_SECRET_PROD;
  keys.rzpKeyId = process.env.RZP_KEY_ID_PROD;
  keys.rzpKeySecret = process.env.RZP_KEY_SECRET_PROD;
  keys.rzpWebHookSecret = process.env.RZP_WEBHOOK_SECRET_PROD;
} else {
  keys.dbConnection = process.env.DB_CONNECTION_DEV;
  keys.emailId = process.env.EMAIL_ID_DEV;
  keys.emailPass = process.env.EMAIL_PASSWORD_DEV;
  keys.emailServer = process.env.EMAIL_SERVER_DEV;
  keys.emailServerPort = process.env.EMAIL_SERVER_PORT_DEV;
  keys.storeName = process.env.STORE_NAME_DEV;
  keys.frontEndBaseUrl = process.env.FRONTEND_BASE_URL_DEV;
  keys.jwtSecret = process.env.JWT_SECRET_DEV;
  keys.cdnryCloudName = process.env.CLOUDINARY_CLOUD_NAME_DEV;
  keys.cdnryApiKey = process.env.CLOUDINARY_API_KEY_DEV;
  keys.cdnryApiSecret = process.env.CLOUDINARY_API_SECRET_DEV;
  keys.rzpKeyId = process.env.RZP_KEY_ID_DEV;
  keys.rzpKeySecret = process.env.RZP_KEY_SECRET_DEV;
  keys.rzpWebHookSecret = process.env.RZP_WEBHOOK_SECRET_DEV;
}

module.exports = keys;
