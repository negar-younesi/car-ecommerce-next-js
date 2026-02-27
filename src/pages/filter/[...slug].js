import { useRouter } from "next/router"
import carsData from "../../../data/carsData"
import CarsList from "../../../components/template/CarsList"

function FilteredCars() {
    const router=useRouter()
    const [min,max]=router.query.slug || []
    const filteredData=carsData.filter((item)=>item.price >= Number(min) && item.price <= Number(max))

    if(filteredData.length === 0) return <h3>NOT FOUND</h3>

    return (
    <CarsList data={filteredData}/>
  )
}

export default FilteredCars