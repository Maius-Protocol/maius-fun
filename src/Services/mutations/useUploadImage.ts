import { useMutation } from 'react-query'
import { axiosInstance } from '@/Config/axios'
import { ApiRoutes } from '@/Config'
import { AxiosResponse } from 'axios'

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

function useUploadImage() {
  return useMutation<
    AxiosResponse<Response>,
    unknown,
    useUploadImageProps,
    unknown
  >(async ({ background, front }) => {
    const formData = new FormData()
    formData.append('background', {
      uri: background,
      name: 'background',
    })
    formData.append('front', {
      uri: front,
      name: 'front',
    })
    return await axiosInstance.post(ApiRoutes.UPLOAD_IMAGE, formData)
  })
}

export default useUploadImage
