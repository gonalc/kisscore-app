import Loader from '@components/Loader'
import useFetchBadges from '@hooks/badges/fetchBadges'
import { StyleSheet, Text, View } from 'react-native'
import * as Icons from '@expo/vector-icons'

const Badges = () => {
  const { badges, loading } = useFetchBadges()

  return (
    <Loader isLoading={loading}>
      <View style={styles.container}>
        {badges.map((badge) => {
          const { name, id, iconFamily, iconKey } = badge

          const Icon = Icons[iconFamily]

          return (
            <View key={`badge-${name}_${id}`}>
              <Text>{name}</Text>

              <Icon name={iconKey} size={24} color="black" />
            </View>
          )
        })}
      </View>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default Badges
