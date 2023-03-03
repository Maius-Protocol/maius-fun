import { useMutation } from 'react-query'
import { axiosInstance } from '@/Config/axios'
import { ApiRoutes, Config } from '@/Config'
import { AxiosResponse } from 'axios'
import mime from 'mime'

interface useUploadImageProps {
  background: string
  front: string
}

interface Response {
  data: {
    image: string
    json: string
  }
}

function useUploadImage(event_address: string) {
  return useMutation<
    AxiosResponse<Response>,
    unknown,
    useUploadImageProps,
    unknown
  >(async ({ background, front }) => {
    const formData = new FormData()
    console.log(background, front.uri)
    formData.append('background', {
      uri: background,
      type: mime.getType(background),
      name: 'background',
    })
    formData.append('front', {
      uri: front,
      type: mime.getType(front),
      name: 'front',
    })
    return await axiosInstance.post(ApiRoutes.UPLOAD_IMAGE, formData, {
      params: {
        event_address,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  })
}

export default useUploadImage
