import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

import UserContext from './UserContext'
import { patchUser } from '../utils/functions/patchUser'
const CreateNewProfileContext = createContext({})


export default CreateNewProfileContext


export const CreateNewProfileProvider = ({ children }: any) => {

    let { me }: any = useContext(UserContext)
    // variables
    const [cities, setCities] = useState<any[]>([])
    const [genres, setGenres] = useState<any[]>([])
    const [studio_services, setStudioServices] = useState<any[]>([])

    const [category, setCategory] = useState<number>()

    const [genreArray, setGenreArray] = useState<any[]>([])
    const [studio_services_array, setStudioServicesArray] = useState<any[]>([])


    // calls
    const get_cities = new Call(Routes.profiles.cities, 'GET')
    const get_genres = new Call(Routes.profiles.genres, 'GET')
    const get_studio_services = new Call(Routes.profiles.studio_services, 'GET')

    const queryParameters = new URLSearchParams(window.location.search)
    const param = queryParameters.get("category")

    // utils
    let has_natural_presence = param === "Store" || param === "Stage" || param === "Studio"


    let is_musician = param === "Musician" ? true : false
    let has_genres = param === "Musician" || param === "Band" ? true : false
    let has_services = param === "Studio" ? true : false


    useEffect(() => {

        get_cities.GET().then((res) => setCities(res?.[1])).catch((err) => console.warn(err))
        get_genres.GET().then((res) => setGenres(res?.[1])).catch((err) => console.warn(err))
        get_studio_services.GET().then((res) => setStudioServices(res?.[1])).catch((err) => console.warn(err))

        switch (param) {
            case "Musician":
                setCategory(1)
                break;
            case "Band":
                setCategory(2)
                break;
            case "Studio":
                setCategory(3)
                break;
            case "Store":
                setCategory(4)
                break;
            case "Stage":
                setCategory(5)
                break;
            default:
                break;
        }

    }, [])




    const handleCheckBox = (state: any, event: any) => {

        const { value, checked } = event.target;

        state((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((allGroups: any) => allGroups !== value)
        );

    }

 
    const onSubmit = async (data: any) => {

        // console.log(data)

        let converted_array = []
        let converted_array_services = []

        // convert 'genresArray' into an array on numbers
        for (let i = 0; i < genreArray.length; i++) {
            converted_array.push(Number(genreArray[i]))
        }
        // convert 'studio_services_array' into an array on numbers
        for (let i = 0; i < studio_services_array.length; i++) {
            converted_array_services.push(Number(studio_services_array[i]))
        }

        let formData: any = new FormData()

        // check if photo exists
        data?.file?.[0] && formData.append('photo', data?.file?.[0])
        formData.append('name', data?.name)
        formData.append('city', data?.city)
        formData.append('user', me?.id)
        formData.append('category', category)

        for (let i = 0; i < converted_array.length; i++) {
            formData.append('genres', converted_array[i])
        }
        for (let i = 0; i < studio_services_array.length; i++) {
            formData.append('studio_services', studio_services_array[i])
        }


        const create_profile = new Call(Routes.profiles.new, 'POST', formData)

        create_profile.POST_MEDIA().then((res) => console.log(res)).catch((err) => console.warn(err))

        // console.warn('submitted', formData)



    }







    let contextData = {

        is_musician: is_musician,
        has_genres: has_genres,
        has_natural_presence: has_natural_presence,
        has_services: has_services,

        cities: cities,
        genres: genres,
        studio_services: studio_services,

        param: param,
        onSubmit: onSubmit,
        handleCheckBox: handleCheckBox,
        setGenreArray: setGenreArray,
        setStudioServicesArray: setStudioServicesArray,
        studio_services_array: studio_services_array,
        genreArray: genreArray,
    }



    return (
        <CreateNewProfileContext.Provider value={contextData}>
            {children}
        </CreateNewProfileContext.Provider>
    )
}