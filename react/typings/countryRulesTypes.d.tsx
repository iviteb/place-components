import { Address } from 'vtex.checkout-graphql'

export interface LineFragment {
  name: keyof Address
  delimiter?: string
  delimiterAfter?: string
}

export interface Field {
  label: string
  hidden?: boolean
  maxLength?: number
  size?: string
  required?: boolean
  autoComplete?: string
}

export interface OptionsField extends Field {
  optionsCaption?: string
  options?: ({ label: string; value: string })[]
}

export interface ReceiverField extends Field {
  elementName?: string
}

export interface Display {
  minimal: LineFragment[][]
  compact: LineFragment[][]
  extended: LineFragment[][]
}

export interface Fields {
  country?: Field
  street?: Field
  number?: Field
  complement?: Field
  reference?: Field
  neighborhood?: Field
  state?: OptionsField
  city?: Field
  receiverName?: ReceiverField
}

export interface CountryRules {
  fields: Fields
  display: Display
}
