import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LeaguesHome from './LeaguesHome'
import SingleLeague from './SingleLeague'

export type LeaguesStackParamsList = {
  LeaguesHome: undefined
  SingleLeague: { leagueId: number }
}

const Stack = createNativeStackNavigator<LeaguesStackParamsList>()

const Leagues = () => {
  return (
    <Stack.Navigator initialRouteName="LeaguesHome">
      <Stack.Screen
        name="LeaguesHome"
        component={LeaguesHome}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="SingleLeague"
        component={SingleLeague}
        options={{
          header: () => null
        }}
      />
    </Stack.Navigator>
  )
}

export default Leagues
