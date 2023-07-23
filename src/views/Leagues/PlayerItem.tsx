import { FC } from 'react'
import type { IUser } from '@_types/users'
import { StyleSheet, Text, View } from 'react-native'
import COLORS from '@utils/colors'
import { getPositionColor } from '@utils/leagues'
import { NunitoSans } from '@utils/fonts'
import { NORMAL_FONT } from '@utils/fonts'
import { LARGER_FONT } from '@utils/fonts'
import { displayNumber } from '@utils/numbers'

interface IPlayerItemProps {
  player: IUser
  position: number
}

const PlayerItem: FC<IPlayerItemProps> = ({ player, position }) => {
  const { name, score } = player

  const styles = getStyles(position)

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.positionBackground}>
        <Text style={styles.positionText}>{position}</Text>
      </View>

      <Text style={styles.score}>{displayNumber(score)}</Text>

      <Text style={styles.playerName}>{name}</Text>
    </View>
  )
}

function getStyles(position: number) {
  return StyleSheet.create({
    cardWrapper: {
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      padding: 10,
      borderRadius: 5,
      gap: 10,
      shadowColor: COLORS.gray,
      shadowOffset: {
        width: 10,
        height: 20
      },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 10,
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: 10
    },
    positionBackground: {
      backgroundColor: getPositionColor(position).background,
      width: 30,
      height: 30,
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    positionText: {
      color: getPositionColor(position).text,
      fontFamily: NunitoSans,
      textAlign: 'center',
      fontSize: NORMAL_FONT
    },
    score: {
      fontSize: LARGER_FONT,
      color: COLORS.black
    },
    playerName: {
      fontFamily: NunitoSans,
      fontSize: NORMAL_FONT,
      color: COLORS.black
    }
  })
}

export default PlayerItem
