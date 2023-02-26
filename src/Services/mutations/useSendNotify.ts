import { useMutation } from 'react-query'
import { ApiRoutes } from '@/Config'
import { axiosInstance } from '@/Config/axios'

interface useSendNotifyProps {
  wallet: string
  url: string
  fcm_token: string
  event_address: string
}

function useSendNotify() {
  return useMutation(
    async ({ wallet, url, fcm_token, event_address }: useSendNotifyProps) => {
      return await axiosInstance.post(
        ApiRoutes.SEND_NOTIFY,
        {},
        {
          params: {
            wallet,
            url,
            fcm_token,
            event_address,
          },
        },
      )
    },
  )
}

export default useSendNotify
