import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import AuthContext from './AuthContext'

const CreateNewProfileContext = createContext({})


export default CreateNewProfileContext


export const CreateNewProfileProvider = ({ children }: any) => {
    let { userData }: any = useContext(AuthContext)
    // variables
    const [cities, setCities] = useState<any[]>([])
    const [genres, setGenres] = useState<any[]>([])
    const [genreArray, setGenreArray] = useState<any[]>([])
    const [category, setCategory] = useState<number>()

    // calls
    const get_cities = new Call(Routes.profiles.cities, 'GET')
    const get_genres = new Call(Routes.profiles.genres, 'GET')

    const queryParameters = new URLSearchParams(window.location.search)
    const param = queryParameters.get("category")

    // utils
    let has_natural_presence = param === "Store" || param === "Stage" || param === "Studio"


    let is_musician = param === "Musician" ? true : false

    let has_genres = param === "Musician" || param === "Band" ? true : false




    useEffect(() => {

        get_cities.GET().then((res) => setCities(res?.[1])).catch((err) => console.warn(err))
        get_genres.GET().then((res) => setGenres(res?.[1])).catch((err) => console.warn(err))

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

        let converted_array = []

        // console.log(data)
        let formData = new FormData()
        formData.append('file', data?.file?.[0])

        for (let i = 0; i < genreArray.length; i++) {
            converted_array.push(Number(genreArray[i]))
        }


        const finalData = {


            name: data?.name,
            city: data?.city,
            file: undefined,
            user: userData.id,
            photo: data?.file?.[0],
            category: category,

            "genres": [
                1,
                2
            ]



        }

        const create_profile = new Call(Routes.profiles.new, 'POST', finalData)

        create_profile.POST_MEDIA().then((res) => console.log(res)).catch((err) => console.warn(err))

        console.warn('submitted', finalData)



    }







    let contextData = {

        is_musician: is_musician,
        has_genres: has_genres,
        has_natural_presence: has_natural_presence,

        cities: cities,
        genres: genres,
        param: param,
        onSubmit: onSubmit,
        handleCheckBox: handleCheckBox,
        setGenreArray: setGenreArray,
        genreArray: genreArray,
    }



    return (
        <CreateNewProfileContext.Provider value={contextData}>
            {children}
        </CreateNewProfileContext.Provider>
    )
}