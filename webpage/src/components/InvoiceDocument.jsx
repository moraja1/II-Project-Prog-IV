import {StyleSheet, PDFViewer} from "@react-pdf/renderer";
import Invoice from "./InvoicePdf/Invoice.jsx";
// Create styles
const styles = StyleSheet.create({
    viewer: {
        width: "100%",
        height: window.innerHeight,
    },
});

export function InvoiceDocument({ invoice }) {
    return (
        <PDFViewer style={styles.viewer}>
            <Invoice invoice={invoice}/>
        </PDFViewer>
    );
}