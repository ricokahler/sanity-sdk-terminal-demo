import {DocumentHandle, usePaginatedDocuments} from '@sanity/sdk-react'
import {PAGE_SIZE, PANE_WIDTH} from './constants'
import {Box, BoxProps, Text} from 'ink'
import {Select} from './select'
import {Button} from './button'
import {ItemProps} from 'ink-select-input'
import {Suspense} from 'react'
import {DocumentPreview} from './document-preview'

interface DocumentListProps extends BoxProps {
  documentType: string
  onSelect: (handle: DocumentHandle) => void
}

const MAX_TEXT_LENGTH = 30

function Item({label, isSelected}: ItemProps) {
  const handle: DocumentHandle = JSON.parse(label)
  return (
    <Suspense fallback={<Text>Loading…</Text>}>
      <DocumentPreview {...handle} />
    </Suspense>
  )
}

export function DocumentList({documentType, onSelect, ...props}: DocumentListProps) {
  const {data, currentPage, totalPages, nextPage, previousPage} = usePaginatedDocuments({
    documentType,
    pageSize: PAGE_SIZE,
  })

  return (
    <Box flexDirection="column" borderStyle="round" width={PANE_WIDTH} {...props}>
      <Box paddingX={1}>
        <Text>Select a document:</Text>
      </Box>
      <Select
        itemComponent={Item}
        items={data.map((handle) => ({value: handle.documentId, label: JSON.stringify(handle)}))}
        onSelect={(e) => onSelect(JSON.parse(e.label))}
      />
      <Box>
        <Button label="Prev" onSelect={previousPage} />
        <Box flexGrow={1} flexShrink={0} padding={1}>
          <Text>
            Page {currentPage}/{totalPages}
          </Text>
        </Box>
        <Button label="Next" onSelect={nextPage} />
      </Box>
    </Box>
  )
}
