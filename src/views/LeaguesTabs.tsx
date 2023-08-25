import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Leagues from './Leagues'
import Settings from './Settings'
import COLORS from '../utils/colors'
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Badges from './Badges'

const Tab = createBottomTabNavigator()

const LeaguesTabs = () => {
  const tabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: COLORS.black
    },
    tabBarActiveTintColor: COLORS.red,
    tabBarInactiveTintColor: COLORS.whiteRed,
    tabBarShowLabel: false
  }

  const leaguesOptions: BottomTabNavigationOptions = {
    ...tabOptions,
    tabBarIcon: (iconProps) => <Ionicons name="trophy" {...iconProps} />
  }

  const badgesOptions: BottomTabNavigationOptions = {
    ...tabOptions,
    tabBarIcon: (iconProps) => <MaterialCommunityIcons name="medal" {...iconProps} />
  }

  const settingsOptions: BottomTabNavigationOptions = {
    ...tabOptions,
    tabBarIcon: (iconProps) => <FontAwesome name="cog" {...iconProps} />
  }

  return (
    <Tab.Navigator>
      <Tab.Screen options={leaguesOptions} name="Leagues" component={Leagues} />
      <Tab.Screen options={badgesOptions} name="Badges" component={Badges} />
      <Tab.Screen options={settingsOptions} name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default LeaguesTabs
