const Constants = {
  CDN_URL: 'https://cdn.maiuspay.com/',
  IMAGE_SIZE: 512,
}

export const ConvertS3UrlToCDN = (key: string) => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/' + key
  }
  return Constants.CDN_URL + key
}

export default Constants
