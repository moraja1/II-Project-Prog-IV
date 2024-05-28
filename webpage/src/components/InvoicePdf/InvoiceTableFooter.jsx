import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#333'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


export const InvoiceTableFooter = ({ label, total }) => {
    return(
        <View style={styles.row}>
            <Text style={styles.description}>{label}</Text>
            <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
        </View>
    )
};

