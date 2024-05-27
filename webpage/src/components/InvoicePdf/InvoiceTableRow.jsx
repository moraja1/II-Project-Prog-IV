import {Text, View, StyleSheet } from '@react-pdf/renderer';
import {Fragment} from "react";

const borderColor = '#333'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


export const InvoiceTableRowProduct = ({items}) => {
    const rows = items.map( (item, index) =>
        <View style={styles.row} key={index}>
            <Text style={styles.description}>{item.product.name}</Text>
            <Text style={styles.qty}>{item.quantity}</Text>
            <Text style={styles.rate}>{item.product.price}</Text>
            <Text style={styles.amount}>{(item.quantity * item.product.price).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};

export const InvoiceTableRowService = ({items}) => {
    const rows = items.map( (item, index) =>
        <View style={styles.row} key={index}>
            <Text style={styles.description}>{item.service.name}</Text>
            <Text style={styles.qty}>{item.hourAmount}</Text>
            <Text style={styles.rate}>{item.service.priceHour}</Text>
            <Text style={styles.amount}>{(item.hourAmount * item.service.priceHour).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};