"use client"

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Invoice } from "@/lib/mock-api/invoices"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: "#1e40af",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flexDirection: "column",
    width: "48%",
  },
  label: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#e5e7eb",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#e5e7eb",
    backgroundColor: "#f3f4f6",
    padding: 8,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#e5e7eb",
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  tableCell: {
    fontSize: 9,
    color: "#6b7280",
  },
  total: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e40af",
  },
})

const InvoicePDF = ({ invoice }: { invoice: Invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Nation IT Conference 2025</Text>
        <Text style={styles.subtitle}>43rd National IT Conference</Text>
      </View>

      <View style={styles.invoiceInfo}>
        <View style={styles.column}>
          <Text style={styles.label}>BILL TO:</Text>
          <Text style={styles.value}>{invoice.companyName}</Text>
          <Text style={styles.label}>INVOICE NUMBER:</Text>
          <Text style={styles.value}>{invoice.invoiceNumber}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>INVOICE DATE:</Text>
          <Text style={styles.value}>{new Date(invoice.date).toLocaleDateString()}</Text>
          <Text style={styles.label}>DUE DATE:</Text>
          <Text style={styles.value}>{new Date(invoice.dueDate).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Description</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Unit Price</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
        </View>
        {invoice.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>LKR {item.unitPrice.toLocaleString()}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>LKR {item.total.toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>LKR {invoice.totalAmount.toLocaleString()}</Text>
        </View>
      </View>
    </Page>
  </Document>
)

interface InvoicePDFDownloadProps {
  invoice: Invoice
}

export function InvoicePDFDownload({ invoice }: InvoicePDFDownloadProps) {
  return (
    <PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName={`${invoice.invoiceNumber}.pdf`}>
      {({ loading }) => (
        <Button disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
