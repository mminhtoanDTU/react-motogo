import { Image } from 'antd';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useCallback, useEffect, useState } from 'react';
import ReactMapGL, {
    FlyToInterpolator,
    GeolocateControl,
    Layer,
    Marker,
    Source,
} from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import { branchInfoSelector, searchInfoSelector, setBranchInfo } from '../../motoSlice';
import PopupDistance from '../PopupDistance';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function Mapbox() {
    //const myPoint = useLocation();
    const dispatch = useDispatch();
    const searchInfo = useSelector(searchInfoSelector);
    const branchInfo = useSelector(branchInfoSelector);
    const [branchList, setBranchList] = useState([]);
    const [routes, setRoutes] = useState({});
    const [userCoordinates, setUserCoordinates] = useState({});
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 13.106896922238525,
        longitude: 109.28230777032864,
        zoom: 13,
    });

    //Fetch branches list
    useEffect(() => {
        async function getBranches() {
            const result = await axiosClient.get(`/branches?citycode=${searchInfo.location}`);
            const branches = result.data;
            setBranchList(branches);
            setViewport((pre) => ({
                ...pre,
                latitude: branches[0].coordinates.lat,
                longitude: branches[0].coordinates.lng,
                zoom: 13,
                transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
                transitionDuration: 'auto',
            }));
            dispatch(setBranchInfo({ countBranches: branches.length }));
        }

        getBranches();
    }, [dispatch, searchInfo]);

    //Fetch distance between 2 location
    useEffect(() => {
        async function getdistance() {
            const res = await axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoordinates.lng},${userCoordinates.lat};${branchInfo.coordinates.lng},${branchInfo.coordinates.lat}?alternatives=true&geometries=geojson&language=vi&overview=simplified&steps=true&access_token=${MAPBOX_TOKEN}`
            );

            setRoutes(res.data.routes[0]);
        }

        if (branchInfo.coordinates) {
            getdistance();
        }
    }, [branchInfo.coordinates, userCoordinates.lat, userCoordinates.lng]);

    const handleSetUserCoordinates = useCallback((e) => {
        const value = {
            lat: e.coords.latitude,
            lng: e.coords.longitude,
        };
        setUserCoordinates(value);
    }, []);

    const handleMarkerBranchClick = useCallback(
        (branch) => {
            if (branchInfo.id !== branch.id) {
                dispatch(setBranchInfo(branch));
            }
        },
        [branchInfo, dispatch]
    );

    const dataOne = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: routes.geometry?.coordinates || [],
        },
    };
    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            mapboxApiAccessToken={MAPBOX_TOKEN}
        >
            {branchList.map((branch) => (
                <Marker
                    key={branch.id}
                    latitude={branch.coordinates.lat}
                    longitude={branch.coordinates.lng}
                    onClick={() => handleMarkerBranchClick(branch)}
                    offsetTop={-50}
                    offsetLeft={-20}
                >
                    <Image
                        alt='marker'
                        className='marker'
                        src='https://res.cloudinary.com/toanlee/image/upload/v1638513311/logo_v8qku8.png'
                        preview={false}
                    />
                </Marker>
            ))}
            {branchInfo.coordinates && (
                <>
                    <Source id='polylineLayer' type='geojson' data={dataOne}>
                        <Layer
                            id='lineLayer'
                            type='line'
                            source='my-data'
                            layout={{
                                'line-join': 'round',
                                'line-cap': 'round',
                            }}
                            paint={{
                                'line-color': 'rgba(102,157,246, 0.9)',
                                'line-width': 5,
                            }}
                        />
                    </Source>
                    <PopupDistance
                        longitude={branchInfo.coordinates.lng}
                        latitude={branchInfo.coordinates.lat}
                        distance={routes.distance}
                        duration={routes.duration}
                    />
                </>
            )}

            {/* <Marker
                latitude={myPoint.coordinates.lat}
                longitude={myPoint.coordinates.lng}
                offsetTop={-50}
                offsetLeft={-20}
                draggable={false}
                onDragStart={(e) => console.log(e)}
                onDrag={(e) => console.log(e)}
                onDragEnd={(e) => console.log(e)}
            >
                <Image
                    preview={false}
                    width={50}
                    onClick={() => alert('Hello')}
                    className='marker'
                    src='https://smarttrain.edu.vn/assets/uploads/2017/10/678111-map-marker-512.png'
                />
            </Marker> */}
            <GeolocateControl
                style={{ bottom: 20, right: 10, margin: 10 }}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                showAccuracyCircle={false}
                onGeolocate={handleSetUserCoordinates}
                auto
            />
        </ReactMapGL>
    );
}

export default Mapbox;
