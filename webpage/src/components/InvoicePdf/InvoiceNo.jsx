import {Text, View, StyleSheet } from '@react-pdf/renderer';
import {Fragment} from "react";

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    }
});


const InvoiceNo = ({invoice}) => (
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>No Factura:</Text>
            <Text style={styles.invoiceDate}>{invoice.code}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date:</Text>
            <Text >{invoice.date}</Text>
        </View >
    </Fragment>
);

export default InvoiceNo