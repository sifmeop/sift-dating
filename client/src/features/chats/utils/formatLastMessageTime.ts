import dayjs from 'dayjs'

export const formatLastMessageTime = (time: string) => {
  const date = dayjs(time)

  if (date.isSame(dayjs(), 'day')) {
    return date.format('HH:mm')
  }

  if (date.isSame(dayjs(), 'week')) {
    return date.format('ddd')
  }

  return date.format('DD.MM.YYYY')
}
