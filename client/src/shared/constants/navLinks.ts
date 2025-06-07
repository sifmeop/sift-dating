import { PiChatsCircle, PiUserCircle } from 'react-icons/pi'
import { TbCards } from 'react-icons/tb'
import { ROUTES } from './routes'

export const NAV_LINKS = [
  { label: 'Dating', Icon: TbCards, href: ROUTES.DATING },
  { label: 'Chats', Icon: PiChatsCircle, href: ROUTES.CHATS },
  { label: 'Profile', Icon: PiUserCircle, href: ROUTES.PROFILE }
]
