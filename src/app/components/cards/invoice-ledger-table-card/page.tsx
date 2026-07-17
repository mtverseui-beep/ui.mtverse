import { CardPage } from "@/components/library/CardPage";
import { InvoiceLedgerTable } from "@/components/cards/tables/InvoiceLedgerTable";

export default function Page() {
  return (
    <CardPage slug="invoice-ledger-table-card">
      <InvoiceLedgerTable />
    </CardPage>
  );
}
