import {DocumentHandle, useDocument} from '@sanity/sdk-react'
import {Box, Text} from 'ink'
import {PaneLayout} from './pane-layout'

export function DocumentViewer(doc: DocumentHandle) {
  const {data} = useDocument(doc)

  return (
    <PaneLayout
      width={60}
      header={
        <>
          <Text bold>{doc.documentType}</Text>
          <Text> {doc.documentId}</Text>
        </>
      }
    >
      <Box borderStyle="single">
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </Box>
    </PaneLayout>
  )
}
