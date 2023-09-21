import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '@utils/colors'
import type { IConquist } from '@_types/conquists'
import { useState, type FC } from 'react'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import i18n from '@i18n/index'
import { sortByField } from '@utils/sorter'
import DeleteConquistModal from './DeleteConquistModal'
import ConquistDisplay from './ConquistDisplay'

interface IUserConquistsProps {
  conquists: IConquist[]
}

const UserConquists: FC<IUserConquistsProps> = ({ conquists = [] }) => {
  const [selectedConquist, setSelectedConquist] = useState<IConquist | null>(null)

  const renderContent = () => {
    if (conquists?.length) {
      return (
        <FlatList
          data={conquists.sort(sortByField('score'))}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onLongPress={() => setSelectedConquist(item)}>
                <ConquistDisplay item={item} />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => `user-conquist_${item.id}_${item.userId}`}
          ListFooterComponent={View}
          ListFooterComponentStyle={{ padding: 20 }}
        />
      )
    }

    return (
      <View>
        <Text style={styles.noConquistsText}>{i18n.t('conquists.noConquists')}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.grayText, styles.title]}>{i18n.t('labels.conquists')}</Text>
      <View>{renderContent()}</View>
      <DeleteConquistModal item={selectedConquist} close={() => setSelectedConquist(null)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
    overflow: 'hidden'
  },
  scoreContainer: {
    backgroundColor: COLORS.blue,
    padding: 5,
    borderRadius: 3,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noConquistsText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    textAlign: 'center'
  },
  text: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  },
  grayText: {
    color: COLORS.gray
  },
  title: {
    textAlign: 'center',
    paddingBottom: 5
  }
})

export default UserConquists
