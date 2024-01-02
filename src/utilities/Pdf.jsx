import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "40 20",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  headerLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    fontSize: "10",
  },
  headerRight: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingRight: "20",
    paddingTop: "20",
  },
  table: {
    marginTop: 20,
    marginBottom: 5,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  headerRow: {
    width: "100%",
    height: 30,
    display: "flex",
    flexDirection: "row",
  },
  tableHeaderCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    border: "1px solid #111",
    borderLeft: "none",
    backgroundColor: "gray",
  },
  tableHeaderCellName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    border: "1px solid #111",
    backgroundColor: "gray",
  },
  tableCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    border: "1px solid #111",
    borderLeft: "none",
    borderTop: "none",
  },
  tableCellName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    border: "1px solid #111",
    borderTop: "none",
  },
  row: {
    width: "100%",
    height: 30,
    display: "flex",
    flexDirection: "row",
    borderTop: "none",
  },
  textArea: {
    marginTop: 10,
    textAlign: "center",
    fontSize: "10",
  },
});

function Pdf({ cart = [], calculateSum, products = [] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.text}>Datum: ponedjeljak, 1. maj 2023.</Text>
            <Text style={styles.text}>
              Auto Parts Online doo Mile Jevtović 4, 11030 Beograd
            </Text>
            <Text style={styles.text}>www.prodajadelova.rs</Text>
            <Text style={styles.text}>info@prodajadelova.rs</Text>
            <Text style={styles.text}>011/4300045</Text>
            <Text style={styles.text}>Tekući račun: 170-30047885001-18</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>PRODAJA DELOVA</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={styles.tableHeaderCellName}>
              <Text style={styles.text}>Naziv artikla</Text>
            </View>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.text}>Sifra artikla</Text>
            </View>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.text}>Cena sa PDV-om</Text>
            </View>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.text}>Kolicina</Text>
            </View>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.text}>Ukupan iznos</Text>
            </View>
          </View>
          {cart.length !== 0 &&
            cart.map((cartItem) => {
              const { name, id, price, selectedCount } = cartItem;
              return (
                <View style={styles.row} key={id}>
                  <View style={styles.tableCellName}>
                    <Text style={styles.text}>{name}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{id}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{price}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{selectedCount}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{price * selectedCount}</Text>
                  </View>
                </View>
              );
            })}
          {products.length !== 0 &&
            products.map((productItem) => {
              console.log(productItem);
              const { name, id, price, selectedCount } = productItem;
              return (
                <View style={styles.row} key={id}>
                  <View style={styles.tableCellName}>
                    <Text style={styles.text}>{name}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{id}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{price}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{selectedCount}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text}>{price * selectedCount}</Text>
                  </View>
                </View>
              );
            })}
        </View>
        <Text style={styles.text}>
          Ukupan iznos sa PDV-om: {calculateSum()}
        </Text>
        <Text style={styles.textArea}>
          Da biste poručili navedene artikle, posetite www.prodajadelova.rs, ili
          nas kontaktirajte na info@prodajadelova.rs. Pored toga, na
          raspolaganju vam je i naš tim stručnih savetnika svakog radnog dana od
          8.30 do 16.30, kao i subotom od 9.00 do 14.00, koji vam mogu pomoći u
          izboru pozivom na 011/4300045
        </Text>
      </Page>
    </Document>
  );
}

export default Pdf;
