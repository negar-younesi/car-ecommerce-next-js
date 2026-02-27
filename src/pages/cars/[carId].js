import { useRouter } from "next/router"
import carsData from '../../../data/carsData'
import CarDetailes from '../../../components/template/CarDetailes'
function CarDetaile() {
    const router=useRouter()
    const {carId}=router.query
    
    if(!carId) return <div>Loading...</div>
    
    const carDetailes=carsData.find(car => car.id === Number(carId))
    
    if(!carDetailes) return <div>Car not found</div>
   
  return (
    <CarDetailes {...carDetailes}/>
  )
}

export default CarDetaile