import {Box, BoxProps, Text} from 'ink'
import {PANE_WIDTH} from './constants'

interface PaneLayoutProps extends BoxProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
}

export function PaneLayout({header, footer, children, ...props}: PaneLayoutProps) {
  return (
    <Box flexDirection="column" borderStyle="round" width={PANE_WIDTH} {...props}>
      {header && <Box paddingX={1}>{header}</Box>}
      <Box flexGrow={1}>{children}</Box>
      {footer && <Box>{footer}</Box>}
    </Box>
  )
}
