import ProfileScreen from '../components/ProfileScreen'
import { useQueryAccount, useQueryAccountStatistics } from '../queryHooks'

function ProfileRoute() {
  const accountQuery = useQueryAccount({ enabled: true })
  const accountStatisticsQuery = useQueryAccountStatistics({
    enabled: !accountQuery.isLoading && Boolean(accountQuery.data?.user)
  })

  return (
    <ProfileScreen
      account={accountQuery.data?.user ?? null}
      statistics={accountStatisticsQuery.data?.statistics ?? null}
      isLoading={accountQuery.isLoading}
      isStatisticsLoading={Boolean(accountQuery.data?.user) && (accountStatisticsQuery.isLoading || accountStatisticsQuery.isRefetching)}
      errorMessage={accountQuery.error instanceof Error ? accountQuery.error.message : null}
      statisticsErrorMessage={accountStatisticsQuery.error instanceof Error ? accountStatisticsQuery.error.message : null}
    />
  )
}

export default ProfileRoute
