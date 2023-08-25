import * as Application from 'expo-application'

function parseReferralLink(url: string) {
  const params: Record<string, string> = {}

  url.split('&').forEach((param) => {
    const [key, value] = param.split('=')

    params[key] = value
  })

  return params
}

export async function getInstallationReferral(): Promise<string | undefined> {
  const url = await Application.getInstallReferrerAsync()

  const params = parseReferralLink(url)

  const { referral } = params

  return referral
}
