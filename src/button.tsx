import {Box, Text, useFocus, useInput} from 'ink'

interface ButtonProps {
  onSelect?: () => void
  label: string
}

export function Button({label, onSelect}: ButtonProps) {
  const {isFocused} = useFocus()

  useInput(
    (input, key) => {
      if (key.return || input === ' ') {
        onSelect()
      }
    },
    {isActive: isFocused},
  )

  return (
    <Box borderStyle={isFocused ? 'bold' : 'single'} flexGrow={1} flexShrink={0}>
      <Text>{label}</Text>
    </Box>
  )
}
