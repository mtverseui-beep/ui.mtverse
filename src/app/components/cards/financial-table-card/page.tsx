import { CardPage } from "@/components/library/CardPage";
import { FinancialTable } from "@/components/cards/tables/FinancialTable";

export default function Page() {
  return (
    <CardPage slug="financial-table-card">
      <FinancialTable />
    </CardPage>
  );
}
