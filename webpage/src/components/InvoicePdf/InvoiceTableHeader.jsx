import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#333'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#333',
        backgroundColor: '#333',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        color: "white"
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Producto</Text>
        <Text style={styles.qty}>Cantidad</Text>
        <Text style={styles.rate}>Precio</Text>
        <Text style={styles.amount}>Subtotal</Text>
    </View>
);

export default InvoiceTableHeader