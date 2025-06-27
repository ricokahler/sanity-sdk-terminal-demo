import {useQuery} from '@sanity/sdk-react'
import {Box, BoxProps, Text} from 'ink'
import {useState} from 'react'
import {Select} from './select'
import {Button} from './button'
import {PAGE_SIZE, PANE_WIDTH} from './constants'
import {TruncatedText} from './truncated-text'
import {ItemProps} from 'ink-select-input'
import {PaneLayout} from './pane-layout'

interface DocumentTypeListProps extends BoxProps {
  onSelect: (documentType: string) => void
}

export function DocumentTypeList({onSelect, ...props}: DocumentTypeListProps) {
  const [pageIndex, setPageIndex] = useState(0)
  const start = pageIndex * PAGE_SIZE
  const end = (pageIndex + 1) * PAGE_SIZE

  const {data} = useQuery<{documentTypes: string[]; total: number}>({
    query: `{
      "documentTypes": array::unique(*._type)[$start...$end],
      "total": count(array::unique(*._type))
    }`,
    params: {start, end},
  })

  const {documentTypes, total} = data
  const items = documentTypes.map((value) => ({value, label: value}))
  const pages = Math.ceil(total / PAGE_SIZE)

  return (
    <PaneLayout
      {...props}
      header={<Text>Select a document type:</Text>}
      footer={
        <>
          <Button label="Prev" onSelect={() => setPageIndex((page) => Math.max(page - 1, 0))} />
          <Box flexGrow={1} flexShrink={1} padding={1}>
            <Text>
              Page {pageIndex + 1}/{pages}
            </Text>
          </Box>
          <Button label="Next" onSelect={() => setPageIndex((page) => page + 1)} />
        </>
      }
    >
      <Select items={items} onSelect={(item) => onSelect(item.value as string)} />
    </PaneLayout>
  )
}
