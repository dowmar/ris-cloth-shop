import { Link } from "react-router-dom"
import ProductTable from "./ProductTable"
import Header from "./Header"

const Admin = () => {
    return (
        <section>
            <div>
                <Header />
            </div>

            <br />
            {/* <Foods /> */}
            <ProductTable />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin