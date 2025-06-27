import {Box, useFocus} from 'ink'
import SelectInput, {ItemProps} from 'ink-select-input'
import {TruncatedText} from './truncated-text'

function Item({label}: ItemProps) {
  return <TruncatedText>{label}</TruncatedText>
}

export function Select(props: React.ComponentProps<typeof SelectInput>) {
  const {isFocused} = useFocus()
  return (
    <Box borderStyle={isFocused ? 'bold' : 'single'} flexGrow={1}>
      <SelectInput itemComponent={Item} isFocused={isFocused} {...props} />
    </Box>
  )
}
