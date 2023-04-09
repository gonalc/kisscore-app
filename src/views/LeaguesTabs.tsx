import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Leagues from './Leagues'
import Settings from './Settings'
import Ranking from './Ranking'
import COLORS from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const LeaguesTabs = () => {
  const tabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: COLORS.black
    },
    tabBarActiveTintColor: COLORS.red,
    tabBarInactiveTintColor: COLORS.white,
    tabBarShowLabel: false
  }

  const leaguesOptions: BottomTabNavigationOptions = {
    ...tabOptions,
    tabBarIcon: (iconProps) => <Ionicons name="trophy" {...iconProps} />
  }

  const rankingOptions: BottomTabNavigationOptions = {
    ...tabOptions,
    tabBarIcon: (iconProps) => <Ionicons name="podium-sharp" {...iconProps} />
  }

  const settingsOptions: BottomTabNavigationOptions = {
    ...tabOptions,
    tabBarIcon: (iconProps) => <FontAwesome name="cog" {...iconProps} />
  }

  return (
    <Tab.Navigator>
      <Tab.Screen options={leaguesOptions} name="Leagues" component={Leagues} />
      <Tab.Screen options={rankingOptions} name="Ranking" component={Ranking} />
      <Tab.Screen options={settingsOptions} name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default LeaguesTabs
