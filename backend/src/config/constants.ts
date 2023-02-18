const Constants = {
  CDN_URL: 'https://cdn.maiuspay.com/',
  IMAGE_SIZE: 512,
}

export const ConvertS3UrlToCDN = (key: string) => {
  return Constants.CDN_URL + key
}

export default Constants
