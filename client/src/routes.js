//AMDIN
import AdminDashboard from "./pages/admin/AdminDashboard"
//AMDIN ADD

//AMDIN VIEW
import AdminApartmantView from "./pages/admin/view/AdminApartmantView"
import AdminCarView from "./pages/admin/view/AdminCarView"
import AdminDiseaseView from "./pages/admin/view/AdminDiseaseView"
import AdminDistrictView from "./pages/admin/view/AdminDistrictView"
import AdminDriverView from "./pages/admin/view/AdminDriverView"
import AdminEntranceView from "./pages/admin/view/AdminEntranceView"
import AdminFloorView from "./pages/admin/view/AdminFloorView"
import AdminHouseView from "./pages/admin/view/AdminHouseView"
import AdminNeighborhoodView from "./pages/admin/view/AdminNeighborhoodView"
import AdminObjectView from "./pages/admin/view/AdminObjectView"
import AdminPeopleView from "./pages/admin/view/AdminPeopleView"
import AdminSideView from "./pages/admin/view/AdminSideView"
import AdminUserView from "./pages/admin/view/AdminUserView"

//MANAGER
import ManagerDashboard from "./pages/manager/ManagerDashboard"
//MANAGER ADD
import ApartmantAdd from "./pages/manager/add/ApartmantAdd"
import CarAdd from "./pages/manager/add/CarAdd"
import DiseaseAdd from "./pages/manager/add/DiseaseAdd"
import DiseaseInfoAdd from "./pages/manager/add/DiseaseInfoAdd"
import DistrictAdd from "./pages/manager/add/DistrictAdd"
import DriverAdd from "./pages/manager/add/DriverAdd"
import EntranceAdd from "./pages/manager/add/EntranceAdd"
import FloorAdd from "./pages/manager/add/FloorAdd"
import HouseAdd from "./pages/manager/add/HouseAdd"
import ObjectAdd from "./pages/manager/add/ObjectAdd"
import PeopleAdd from "./pages/manager/add/PeopleAdd"
import SideAdd from "./pages/manager/add/SideAdd"
import ShiftAdd from "./pages/manager/add/ShiftAdd"

//MANAGER VIEW
import ApartmantView from "./pages/manager/view/ApartmantView"
import CarView from "./pages/manager/view/CarView"
import DriverView from "./pages/manager/view/DriverView"
import DiseaseView from "./pages/manager/view/DiseaseView"
import DistrictView from "./pages/manager/view/DistrictView"
import EntranceView from "./pages/manager/view/EntranceView"
import FloorView from "./pages/manager/view/FloorView"
import HouseView from "./pages/manager/view/HouseView"
import ObjectView from "./pages/manager/view/ObjectView"
import PeopleView from "./pages/manager/view/PeopleView"
import SideView from "./pages/manager/view/SideView"
import StatisticsView from "./pages/manager/view/StatisticsView"
import MapView from "./pages/manager/view/MapView"

//MANAGER GET
import ApartmantUpdate from "./pages/manager/update/ApartmantUpdate"
import CarUpdate from "./pages/manager/update/CarUpdate"
import DiseaseUpdate from "./pages/manager/update/DiseaseUpdate"
import DiseaseInfoUpdate from "./pages/manager/update/DiseaseInfoUpdate"
import DistrictUpdate from "./pages/manager/update/DistrictUpdate"
import DriverUpdate from "./pages/manager/update/DriverUpdate"
import EntranceUpdate from "./pages/manager/update/EntranceUpdate"
import FloorUpdate from "./pages/manager/update/FloorUpdate"
import HouseUpdate from "./pages/manager/update/HouseUpdate"
import ObjectUpdate from "./pages/manager/update/ObjectUpdate"
import PeopleUpdate from "./pages/manager/update/PeopleUpdate"
import SideUpdate from "./pages/manager/update/SideUpdate"
import ShiftUpdate from "./pages/manager/update/ShiftUpdate"

//OPERATOR
import OperatorDashboard from "./pages/operator/OperatorDashboard"
import OperatorStatisticsView from "./pages/operator/view/OperatorStatisticsView"

//OPERATOR ADD

//OPERATOR VIEW

//STATISTICS

//STATISTICS ADD

//STATISTICS VIEW

//GENERAL
import Auth from "./pages/Auth"
import Redirects from "./pages/Redirects"

import { ADMIN_APARTMENT_ROUTE, ADMIN_CAR_ROUTE, ADMIN_DASHBOARD_ROUTE, ADMIN_DISEASE_ROUTE, ADMIN_DISTRICT_ROUTE, ADMIN_DRIVER_ROUTE, ADMIN_ENTRANCE_ROUTE, ADMIN_FLOOR_ROUTE, ADMIN_HOUSE_ROUTE, ADMIN_NEIGHBORHOOD_ROUTE, ADMIN_OBJECT_ROUTE, ADMIN_POEPLE_ROUTE, ADMIN_SIDE_ROUTE, ADMIN_USER_ROUTE, LOGIN_ROUTE, MANAGER_ADD_APARTMENT_ROUTE, MANAGER_ADD_CAR_ROUTE, MANAGER_ADD_CITYORVILLAGE_ROUTE, MANAGER_ADD_DISEASEINFO_ROUTE, MANAGER_ADD_DISEASE_ROUTE, MANAGER_ADD_DISTRICT_ROUTE, MANAGER_ADD_DRIVER_ROUTE, MANAGER_ADD_ENTRANCE_ROUTE, MANAGER_ADD_FLOOR_ROUTE, MANAGER_ADD_HOUSE_ROUTE, MANAGER_ADD_NEIGHBORHOOD_ROUTE, MANAGER_ADD_OBJECT_ROUTE, MANAGER_ADD_POEPLE_ROUTE, MANAGER_ADD_SIDE_ROUTE, MANAGER_ADD_STREET_ROUTE, MANAGER_ADD_TERRITORY_ROUTE, MANAGER_APARTMENT_ROUTE, MANAGER_CAR_ROUTE, MANAGER_CITYORVILLAGE_ROUTE, MANAGER_DASHBOARD_ROUTE, MANAGER_DISEASE_ROUTE, MANAGER_DISTRICT_ROUTE, MANAGER_DRIVER_ROUTE, MANAGER_ENTRANCE_ROUTE, MANAGER_FLOOR_ROUTE, MANAGER_GET_APARTMENT_ROUTE, MANAGER_GET_CAR_ROUTE, MANAGER_GET_CITYORVILLAGE_ROUTE, MANAGER_GET_DISEASEINFO_ROUTE, MANAGER_GET_DISEASE_ROUTE, MANAGER_GET_DISTRICT_ROUTE, MANAGER_GET_DRIVER_ROUTE, MANAGER_GET_ENTRANCE_ROUTE, MANAGER_GET_FLOOR_ROUTE, MANAGER_GET_HOUSE_ROUTE, MANAGER_GET_NEIGHBORHOOD_ROUTE, MANAGER_GET_OBJECT_ROUTE, MANAGER_GET_POEPLE_ROUTE, MANAGER_GET_SHIFT_ROUTE, MANAGER_GET_SIDE_ROUTE, MANAGER_GET_STREET_ROUTE, MANAGER_GET_TERRITORY_ROUTE, MANAGER_HOUSE_ROUTE, MANAGER_MAP_ROUTE, MANAGER_NEIGHBORHOOD_ROUTE, MANAGER_OBJECT_ROUTE, MANAGER_POEPLE_ROUTE, MANAGER_SHIFT_ROUTE, MANAGER_SIDE_ROUTE, MANAGER_STATISTICS_ROUTE, MANAGER_STREET_ROUTE, MANAGER_TERRITORY_ROUTE, OPERATOR_DASHBOARD_ROUTE, OPERATOR_STATISTICS_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Redirects
    },
    //ADMIN
    {
        path: ADMIN_DASHBOARD_ROUTE,
        Component: AdminDashboard
    },
    {
        path: ADMIN_APARTMENT_ROUTE,
        Component: AdminApartmantView
    },
    {
        path: ADMIN_CAR_ROUTE,
        Component: AdminCarView
    },
    {
        path: ADMIN_DISEASE_ROUTE,
        Component: AdminDiseaseView
    },
    {
        path: ADMIN_DISTRICT_ROUTE,
        Component: AdminDistrictView
    },
    {
        path: ADMIN_DRIVER_ROUTE,
        Component: AdminDriverView
    },
    {
        path: ADMIN_ENTRANCE_ROUTE,
        Component: AdminEntranceView
    },
    {
        path: ADMIN_FLOOR_ROUTE,
        Component: AdminFloorView
    },
    {
        path: ADMIN_HOUSE_ROUTE,
        Component: AdminHouseView
    },
    {
        path: ADMIN_NEIGHBORHOOD_ROUTE,
        Component: AdminNeighborhoodView
    },
    {
        path: ADMIN_OBJECT_ROUTE,
        Component: AdminObjectView
    },
    {
        path: ADMIN_POEPLE_ROUTE,
        Component: AdminPeopleView
    },
    {
        path: ADMIN_SIDE_ROUTE,
        Component: AdminSideView
    },
    {
        path: ADMIN_USER_ROUTE,
        Component: AdminUserView
    },
    //ADMIN ADD
  
    //MANAGER
    {
        path: MANAGER_DASHBOARD_ROUTE,
        Component: ManagerDashboard
    },   
    {
        path: MANAGER_APARTMENT_ROUTE,
        Component: ApartmantView
    },   
    {
        path: MANAGER_CAR_ROUTE,
        Component: CarView
    },    
    {
        path: MANAGER_DISEASE_ROUTE,
        Component: DiseaseView
    },
    {
        path: MANAGER_DISTRICT_ROUTE,
        Component: DistrictView
    },    
    {
        path: MANAGER_ENTRANCE_ROUTE,
        Component: EntranceView
    },
    {
        path: MANAGER_FLOOR_ROUTE,
        Component: FloorView
    },
    {
        path: MANAGER_HOUSE_ROUTE,
        Component: HouseView
    },
    {
        path: MANAGER_OBJECT_ROUTE,
        Component: ObjectView
    },
    {
        path: MANAGER_DRIVER_ROUTE,
        Component: DriverView
    },
    {
        path: MANAGER_POEPLE_ROUTE,
        Component: PeopleView
    },
    {
        path: MANAGER_SIDE_ROUTE,
        Component: SideView
    },    
    {
        path: MANAGER_MAP_ROUTE,
        Component: MapView
    },
    //MANAGER ADD
    {
        path: MANAGER_ADD_APARTMENT_ROUTE,
        Component: ApartmantAdd
    },
    {
        path: MANAGER_ADD_CAR_ROUTE,
        Component: CarAdd
    },
    {
        path: MANAGER_ADD_DISEASE_ROUTE,
        Component: DiseaseAdd
    },
    {
        path: MANAGER_ADD_DISEASEINFO_ROUTE,
        Component: DiseaseInfoAdd
    },
    {
        path: MANAGER_ADD_DISTRICT_ROUTE,
        Component: DistrictAdd
    },
    {
        path: MANAGER_ADD_DRIVER_ROUTE,
        Component: DriverAdd
    },
    {
        path: MANAGER_ADD_ENTRANCE_ROUTE,
        Component: EntranceAdd
    },
    {
        path: MANAGER_ADD_FLOOR_ROUTE,
        Component: FloorAdd
    },
    {
        path: MANAGER_ADD_HOUSE_ROUTE,
        Component: HouseAdd
    },
    {
        path: MANAGER_ADD_OBJECT_ROUTE,
        Component: ObjectAdd
    },
    {
        path: MANAGER_ADD_POEPLE_ROUTE,
        Component: PeopleAdd
    },
    {
        path: MANAGER_ADD_SIDE_ROUTE,
        Component: SideAdd
    },
    {
        path: MANAGER_SHIFT_ROUTE,
        Component: ShiftAdd
    },
    {
        path: MANAGER_STATISTICS_ROUTE,
        Component: StatisticsView
    },
    //MANAGER GET
    {
        path: MANAGER_GET_APARTMENT_ROUTE + '/:id',
        Component: ApartmantUpdate
    },
    {
        path: MANAGER_GET_CAR_ROUTE + '/:id',
        Component: CarUpdate
    },
    {
        path: MANAGER_GET_DISEASE_ROUTE + '/:id',
        Component: DiseaseUpdate
    },
    {
        path: MANAGER_GET_DISEASEINFO_ROUTE + '/:id',
        Component: DiseaseInfoUpdate
    },
    {
        path: MANAGER_GET_DISTRICT_ROUTE + '/:id',
        Component: DistrictUpdate
    },
    {
        path: MANAGER_GET_DRIVER_ROUTE + '/:id',
        Component: DriverUpdate
    },
    {
        path: MANAGER_GET_ENTRANCE_ROUTE + '/:id',
        Component: EntranceUpdate
    },
    {
        path: MANAGER_GET_FLOOR_ROUTE + '/:id',
        Component: FloorUpdate
    },
    {
        path: MANAGER_GET_HOUSE_ROUTE + '/:id',
        Component: HouseUpdate
    },
    {
        path: MANAGER_GET_OBJECT_ROUTE + '/:id',
        Component: ObjectUpdate
    },
    {
        path: MANAGER_GET_POEPLE_ROUTE + '/:id',
        Component: PeopleUpdate
    },
    {
        path: MANAGER_GET_SIDE_ROUTE + '/:id',
        Component: SideUpdate
    },
    {
        path: MANAGER_GET_SHIFT_ROUTE + '/:id',
        Component: ShiftUpdate
    },

    //OPERATOR
    {
        path: OPERATOR_DASHBOARD_ROUTE,
        Component: OperatorDashboard
    },
    {
        path: OPERATOR_STATISTICS_ROUTE,
        Component: OperatorStatisticsView
    }
    //STATISTICS

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]