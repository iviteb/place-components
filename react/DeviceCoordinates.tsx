import React, { useState, useEffect, useCallback } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain, Spinner, Tooltip, IconLocation } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'

import REVERSE_GEOCODE_QUERY from './graphql/reverseGeocode.graphql'

enum State {
  PROMPT,
  GRANTED,
  LOADING,
  DENIED,
}

const DeviceCoordinates: StorefrontFunctionComponent = () => {
  const { setAddress } = useAddressContext()
  const [state, setState] = useState<State>(State.PROMPT)
  const [executeReverseGeocode, { error, loading, data }] = useLazyQuery(
    REVERSE_GEOCODE_QUERY
  )

  useEffect(() => {
    if (data) {
      setAddress(data.reverseGeocode)
    }

    if (error) {
      console.warn(`error ${error.message}`)
    }
  }, [data, error, setAddress])

  const onGetCurrentPositionSuccess = useCallback(
    ({ coords }: Position) => {
      executeReverseGeocode({
        variables: {
          lat: coords.latitude.toString(),
          lng: coords.longitude.toString(),
        },
      })

      setState(State.GRANTED)
    },
    [executeReverseGeocode]
  )

  const onGetCurrentPositionError = useCallback((err: PositionError) => {
    setState(State.DENIED)
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }, [])

  const onButtonClick = useCallback(() => {
    setState(State.LOADING)
    navigator.geolocation.getCurrentPosition(
      onGetCurrentPositionSuccess,
      onGetCurrentPositionError,
      {
        enableHighAccuracy: true,
      }
    )
  }, [onGetCurrentPositionSuccess, onGetCurrentPositionError])

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result: { state: string }) => {
        if (result.state === 'granted') {
          onButtonClick()
        } else if (result.state === 'denied') {
          setState(State.DENIED)
        }
      })
  }, [onButtonClick])

  const renderIcon = () => {
    let icon = null

    switch (state) {
      case State.PROMPT:
        icon = <IconLocation />
        break
      case State.GRANTED:
        icon = <IconLocation solid />
        break
      case State.LOADING:
        icon = <Spinner size={16} />
        break
      case State.DENIED:
        icon = <IconLocation />
        break
      default:
    }

    return loading ? <Spinner size={16} /> : icon
  }

  let buttonElement = (
    <ButtonPlain disabled={state === State.DENIED} onClick={onButtonClick}>
      {renderIcon()}
      <FormattedMessage id="place-components.label.useCurrentLocation" />
    </ButtonPlain>
  )

  if (state === State.DENIED) {
    buttonElement = (
      <Tooltip label="Permission not granted">{buttonElement}</Tooltip>
    )
  }

  return buttonElement
}

export default DeviceCoordinates
