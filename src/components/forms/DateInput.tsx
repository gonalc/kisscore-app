import { FC, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '../../utils/fonts'
import COLORS from '../../utils/colors'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../utils/dates'

export interface IDateInputProps {
  label: string
  maximumDate?: Date
  onChange: (value: number) => void
  value: number
}

const DateInput: FC<IDateInputProps> = ({ label, maximumDate, onChange, value }) => {
  const [date, setDate] = useState(value)
  const [show, setShow] = useState(false)

  const onChangeDate = (event: DateTimePickerEvent) => {
    setShow(false)
    const { timestamp } = event.nativeEvent
    setDate(timestamp)
    onChange(timestamp)
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={() => setShow(true)} style={styles.container}>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={LARGE_FONT}
          color={COLORS.black}
        />
        <Text style={styles.textInput}>{dayjs(date).format(DATE_FORMAT)}</Text>
      </Pressable>

      {show && (
        <DateTimePicker value={new Date(date)} onChange={onChangeDate} maximumDate={maximumDate} />
      )}
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
