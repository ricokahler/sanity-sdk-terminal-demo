import {Text} from 'ink'
import {DocumentHandle, useDocumentPreview} from '@sanity/sdk-react'
import {TruncatedText} from './truncated-text'

interface DocumentPreviewProps extends DocumentHandle {}

export function DocumentPreview(doc: DocumentPreviewProps) {
  const {
    data: {title, subtitle},
  } = useDocumentPreview(doc)
  return <TruncatedText>{`${title}${subtitle ? `— ${subtitle}` : ''}`}</TruncatedText>
}
