import CarsList from "../../../components/template/CarsList"
import carsData from "../../../data/carsData"
import { useRouter } from "next/router"

function CategoryPage() {
  const router = useRouter()
  const { category } = router.query
  
  
  const categoryCars = carsData.filter(car => car.category === category)
  
  return (
    <CarsList data={categoryCars} />
  )
}

export default CategoryPage


