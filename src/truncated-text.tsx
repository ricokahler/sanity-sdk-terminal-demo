import {Text} from 'ink'
import {MAX_TEXT_SIZE} from './constants'

interface TruncatedTextProps {
  children: string
  maxLength?: number
}

export function TruncatedText({children, maxLength = MAX_TEXT_SIZE}: TruncatedTextProps) {
  return <Text>{children.length > maxLength ? `${children.slice(0, maxLength)}…` : children}</Text>
}
