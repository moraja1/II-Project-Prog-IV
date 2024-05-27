import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import {InvoiceTableRowProduct, InvoiceTableRowService} from './InvoiceTableRow'
import {InvoiceTableFooter} from "./InvoiceTableFooter.jsx";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#333',
    },
});

const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        {invoice.invoiceProducts.length > 0 && <InvoiceTableRowProduct items={invoice.invoiceProducts} />}
        {invoice.invoiceServices.length > 0 && <InvoiceTableRowService items={invoice.invoiceServices} />}
        <InvoiceTableFooter total={invoice.totalPrice} />
    </View>
);

export default InvoiceItemsTable