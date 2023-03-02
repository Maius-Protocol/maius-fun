const Constants = {
  APP_NAME: 'Maius Fun',
  CDN_URL: 'https://cdn.maius.fun/',
  IMAGE_SIZE: 2000,
}

export const ConvertS3UrlToCDN = (key: string) => {
  // if (process.env.NODE_ENV === 'development') {
  //   return 'http://localhost:3000/' + key
  // }
  return Constants.CDN_URL + key
}

export default Constants
