import { useMutation } from 'react-query'
import { axiosInstance } from '@/Config/axios'
import { ApiRoutes } from '@/Config'
import { AxiosResponse } from 'axios'
interface useUploadImageProps {
  frame: string
}

interface Response {
  data: {
    url: string
  }
}

function useUploadFrame() {
  return useMutation<
    AxiosResponse<Response>,
    unknown,
    useUploadImageProps,
    unknown
  >(async ({ frame }) => {
    const formData = new FormData()
    formData.append('frame', {
      uri: frame,
      name: 'frame',
    })
    return await axiosInstance.post(ApiRoutes.UPLOAD_FRAME, formData)
  })
}

export default useUploadFrame
