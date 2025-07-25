import { RevenueSummary } from "../../organisms/RevenueSummary";
import { MainLayout } from "../../templates/MainLayout"
// import { Summary } from "../components/organisms/Summary"
// import { Filters } from "../components/organisms/Filters"
// import { TransactionList } from "../components/organisms/TransactionList"

const TransactionPage = () => {
    return (
        <MainLayout>

            <RevenueSummary />
        </MainLayout>
    )
}

export default TransactionPage;