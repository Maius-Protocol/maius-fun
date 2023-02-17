import { useMutation } from 'react-query'
import { axiosInstance } from '@/Config/axios'
import { ApiRoutes } from '@/Config'

interface useUploadImageProps {
  background: string
  front: string
}

function useUploadImage() {
  return useMutation<unknown, unknown, useUploadImageProps, unknown>(
    async ({ background, front }) => {
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
    },
  )
}

export default useUploadImage
