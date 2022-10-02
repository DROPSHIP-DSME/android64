import React from 'react';
import { Platform } from 'react-native';
import { check, checkMultiple, PERMISSIONS, RESULTS, requestMultiple, request } from 'react-native-permissions';
import { Linking } from 'react-native';
//check location permission
export async function checkLocationPermision() {
    // let result = await check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    let result = await request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    try {   
        switch (result) {
            case RESULTS.UNAVAILABLE:
                
                return false;
            case RESULTS.DENIED:
                if (Platform.OS == 'ios') {
                    Linking.openSettings()
                }
                return false;
            case RESULTS.LIMITED:
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                return false;
        }
    } catch (error) {
    }
}

//check audio permission
export async function checkAudioPermission() {
    let result = await check(Platform.OS === "ios" ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO);
    try {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                return false;
            case RESULTS.DENIED:
                return false;
            case RESULTS.LIMITED:
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                return false;
        }
    } catch (error) {
    }
}

//check camera permission
export async function checkCameraPermission() {
    let result = await check(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
    try {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                return false;
            case RESULTS.DENIED:
                return false;
            case RESULTS.LIMITED:
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                return false;
        }
    } catch (error) {
    }
}

export async function checkStoragePermission() {
    let result = await check(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
    try {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                return false;
            case RESULTS.DENIED:
                return false;
            case RESULTS.LIMITED:
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                return false;
        }
    } catch (error) {
    }
}

//request multiple permissions
export const requestMultiplePermisisons = async () => {
    return new Promise((resolve, reject) => {
        requestMultiple([
            Platform.OS === "ios" ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
            Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
            Platform.OS === "ios" ? PERMISSIONS.IOS.MEDIA_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        ]).then((statuses) => {
            let permission = false;
            if (statuses[PERMISSIONS.IOS.MICROPHONE] == 'blocked' || statuses[PERMISSIONS.IOS.CAMERA] == 'blocked' || statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] == 'blocked' || statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == 'blocked') {
                Linking.openSettings();
            }
            if (statuses[Platform.OS === "ios" ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO] === "granted") {
                permission = true
            }
            else if (statuses[Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA] === "granted") {
                permission = true
            } else if (statuses[Platform.OS === "ios" ? PERMISSIONS.IOS.MEDIA_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted") {
                permission = true
            } else if (statuses[Platform.OS === "ios" ? (PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted") {
                permission = true
            }
            resolve(permission)
        }).catch(error => {
        });
    })

}
