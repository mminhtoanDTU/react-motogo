import React, { useEffect, useState } from 'react'

function useLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
        error: {}
    })

    const onSuccess = locate => {
        setLocation({
            loaded: true,
            coordinates: { lat: locate.coords.latitude, lng: locate.coords.longitude },
            error: {}
        })
    }

    const onFailure = error => {
        setLocation({
            loaded: true,
            error
        })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onFailure({ message: 'Geolocation is not supported' })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
    }, [])

    return location
}

export default useLocation
