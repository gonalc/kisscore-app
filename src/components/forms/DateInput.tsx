import { FC, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '../../utils/fonts'
import COLORS from '../../utils/colors'

interface IDateInputProps {
  label: string
}

const DateInput: FC<IDateInputProps> = ({ label }) => {
  const [date, setDate] = useState(new Date().getTime())
  const [show, setShow] = useState<'date' | 'time' | false>(false)

  const onChange = (event: DateTimePickerEvent) => {
    setShow(false)
    setDate(event.nativeEvent.timestamp)
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={() => setShow('date')} style={styles.container}>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={LARGE_FONT}
          color={COLORS.black}
        />
        <Text style={styles.textInput}>{new Date(date).getDate()}</Text>
      </Pressable>

      {show && <DateTimePicker value={new Date(date)} onChange={onChange} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    alignItems: 'center',
    paddingBottom: 2
  },
  textInput: {
    fontFamily: NunitoSans,
    marginLeft: 10,
    fontSize: FONT_SIZE.body
  },
  label: {
    fontSize: FONT_SIZE.labels,
    fontFamily: NunitoSans
  }
})

export default DateInput
