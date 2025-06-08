import dayjs from 'dayjs'

export const formatLastMessageTime = (time: string) => {
  const date = dayjs(time)
  const now = dayjs()

  if (date.isSame(now, 'day')) {
    return date.format('HH:mm')
  }

  if (date.isSame(now, 'isoWeek')) {
    return date.format('ddd')
  }

  return date.format('DD.MM.YYYY')
}
