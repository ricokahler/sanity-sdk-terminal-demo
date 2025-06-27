import 'dotenv/config'
import {Box, Text, render, useInput} from 'ink'
import process from 'node:process'
import {Suspense, useState} from 'react'
import {DocumentHandle, ResourceProvider, useSanityInstance} from '@sanity/sdk-react'
import {DocumentTypeList} from './document-type-list'
import {DocumentList} from './document-list'
import {PaneLayout} from './pane-layout'
import {DocumentViewer} from './document-viewer'

function useSigint(callback: () => void) {
  useInput((input, key) => {
    // Check if Ctrl+C was pressed (SIGINT signal)
    if (key.ctrl && input === 'c') {
      callback()
    }
  })
}

function MyApp() {
  const instance = useSanityInstance()
  useSigint(instance.dispose)
  const [documentType, setDocumentType] = useState<string | undefined>()
  const [selectedDocument, setSelectedDocument] = useState<DocumentHandle | undefined>()

  return (
    <Box>
      <Suspense
        fallback={
          <PaneLayout>
            <Text>Loading document type list…</Text>
          </PaneLayout>
        }
      >
        <DocumentTypeList onSelect={setDocumentType} />
      </Suspense>
      {documentType && (
        <Suspense
          fallback={
            <PaneLayout>
              <Text>Loading document list…</Text>
            </PaneLayout>
          }
        >
          <DocumentList documentType={documentType} onSelect={setSelectedDocument} />
        </Suspense>
      )}
      {selectedDocument && (
        <Suspense
          fallback={
            <PaneLayout>
              <Text>Loading document…</Text>
            </PaneLayout>
          }
        >
          <DocumentViewer {...selectedDocument} />
        </Suspense>
      )}
    </Box>
  )
}

render(
  <ResourceProvider
    projectId={process.env.SANITY_STUDIO_PROJECT_ID}
    dataset={process.env.SANITY_STUDIO_DATASET}
    fallback={<Text>Loading</Text>}
    auth={{token: process.env.SANITY_TOKEN}}
  >
    <MyApp />
  </ResourceProvider>,
)
