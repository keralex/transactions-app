import { RevenueSummary } from "../../organisms/RevenueSummary";
import { TransactionList } from "../../organisms/TransactionList/TransactionList";
import { MainLayout } from "../../templates/MainLayout"
// import { Summary } from "../components/organisms/Summary"
// import { Filters } from "../components/organisms/Filters"

const TransactionPage = () => {
    return (
        <MainLayout>
            <RevenueSummary />
            <TransactionList />
        </MainLayout>
    )
}

export default TransactionPage;