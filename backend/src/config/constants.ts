const Constants = {
  CDN_URL: 'https://cdn.maiuspay.com/',
}

export const ConvertS3UrlToCDN = (key: string) => {
  return Constants.CDN_URL + key
}

export default Constants
