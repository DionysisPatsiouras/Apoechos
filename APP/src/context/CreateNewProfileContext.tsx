import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'


const CreateNewProfileContext = createContext({})


export default CreateNewProfileContext


export const CreateNewProfileProvider = ({ children }: any) => {


    const [cities, setCities] = useState<any[]>([])
    const [genres, setGenres] = useState<any[]>([])
    const [genreArray, setGenreArray] = useState<any[]>([])

    const get_cities = new Call(Routes.profiles.cities, 'GET')
    const get_genres = new Call(Routes.profiles.genres, 'GET')


    useEffect(() => {

        get_cities.GET().then((res) => setCities(res?.[1])).catch((err) => console.warn(err))
        get_genres.GET().then((res) => setGenres(res?.[1])).catch((err) => console.warn(err))

    }, [])



    const handleCheckBox = (state: any, event: any) => {

        const { value, checked } = event.target;
        // console.log(value)

        state((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((allGroups: any) => allGroups !== value)
        );

    }


    const onSubmit = async (data: any) => {


        let formData = new FormData()
        formData.append('file', data?.file?.[0])

        const finalData = {
            ...data,
            // user: userData.id,
            photo: data?.file?.[0]
        }
        const addMusician = new Call(Routes.musician.post, 'POST', finalData)

        console.warn('submitted', finalData)



    }





    const queryParameters = new URLSearchParams(window.location.search)
    const param = queryParameters.get("category")


    let map = param === "Store" || param === "Stage" || param === "Studio" ? true : false
    let is_musician = param === "Musician" ? true : false




    let contextData = {

        map: map,
        cities: cities,
        genres: genres,
        param: param,
        onSubmit: onSubmit,
        is_musician: is_musician,
        handleCheckBox: handleCheckBox,
        setGenreArray: setGenreArray,
        genreArray: genreArray
    }



    return (
        <CreateNewProfileContext.Provider value={contextData}>
            {children}
        </CreateNewProfileContext.Provider>
    )
}