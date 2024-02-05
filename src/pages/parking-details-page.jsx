import React from "react";
import {Card, Text} from '@rneui/themed';
import { StyleSheet, View } from "react-native";
import {OwnerDetailsBar} from '../components/owner-details'
import './parking-details.types';

/**
 *  @type {React.FC}
 *  @param {ParkingDetailsPageProps} props
 */
export default function ParkingDetailsPage({parkingDetails, onReserveParking}){
    return <>
    <Text h3 style={{paddingHorizontal:12}}>Parking spot</Text>
        <OwnerDetailsBar owner={parkingDetails.owner} />
    </>
}

const styles = StyleSheet.create({
    form:{}
})
