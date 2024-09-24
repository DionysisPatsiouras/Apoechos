import { createContext, useState, useEffect, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'
import UtilsContext from "./UtilsContext"

import { useSnackbarContext } from "./SnackbarContext"


const NewEventContext = createContext({})


export default NewEventContext


export const NewEventProvider = ({ children }: any) => {


    const form = useForm()
    const { register, handleSubmit, formState, resetField, setValue } = form
    const { errors } = formState

    const { snackbar }: any = useSnackbarContext()


    // let get_profiles = new Call(Routes.profiles.all, 'GET')

    // let svg_color = '#C0C0C0'
    let a4Ratio = 1.414
    let wastedMargin = 150
    let fields = ['file', 'title', 'description', 'date', 'time', 'location_name', 'address', 'profileId']


    const [height, setHeight] = useState<any>(undefined)
    const [selectedStage, setSelectedStage] = useState<any>()
    const [selectedBands, setSelectedBands] = useState<any[]>([])
    const [supportActs, setSupportActs] = useState<any[]>([])

    const [customLocation, setCostumLocation] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [stageModal, setStageModal] = useState<boolean>(false)
    const [supportModal, setSupportModal] = useState<boolean>(false)
    const [uploadedFile, setUploadedFile] = useState<any>()



    let { get_cities, cities, all_stages, get_stages, bands_and_musicians, get_bands_and_musicians }: any = useContext(UtilsContext)

    let data = children?.props?.data

    // console.log(children)

    useEffect(() => {

        get_stages()
        get_cities()
        get_bands_and_musicians()

        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))


        if (data) {

            setValue('title', data?.title)
            setValue('description', data.description)
            setValue('date', data.date.split("T")[0])
            setValue('time', data.date.split("T")[1].replace(":00Z", ""))
            setValue('created_by', data.created_by.profileId)

            setSelectedBands(data.main_bands)
            setSupportActs(data?.support_acts)
            setSelectedStage(data?.profile_location)

        }


        // setValue('photo', data?.photo)

    }, [])

    const check_img_type = (file: any) => {
        setUploadedFile(
            file?.target?.files?.[0]?.type === "image/jpeg" ||
                file?.target?.files?.[0]?.type === "image/jpg" ||
                file?.target?.files?.[0]?.type === "image/png"
                ? URL.createObjectURL(file?.target?.files?.[0])
                : alert('Μη επιτρεπόμενη μορφή αρχείου\nΕπιτρεπόμενες μορφές: .png, .jpg, .jpeg'))
    }




    const Post_event = (inputData: any) => {

        // console.log(inputData)
        let formData: any = new FormData()

        // formData.append('photo', inputData?.file?.[0])
        inputData.title && formData.append('title', inputData?.title)
        formData.append('description', inputData.description)
        formData.append('date', `${inputData.date} ${inputData.time}`)


        formData.append('created_by', children?.props?.profileId)
        // !data && formData.append('photo', inputData?.file?.[0])

        if (!customLocation) {
            formData.append('profile_location', selectedStage?.profileId)
        } else {
            formData.append('location_name', inputData.location_name)
            formData.append('city', inputData.city)
            formData.append('address', inputData.address)
        }


        for (let index in selectedBands) {
            formData.append('main_bands', selectedBands[index]?.profileId)
        }
        for (let index in supportActs) {
            formData.append('support_acts', supportActs[index]?.profileId)
        }



        let post_event = new Call(Routes.events.new, 'POST', formData)
 


        post_event
            .POST_MEDIA()
            .then((res) => {
                console.log(res)
                console.log('Event uploaded successfully')
                snackbar('Η εκδήλωση δημοσιεύτηκε')

                children?.props?.closeModal()

                for (let index in fields) {
                    resetField(fields[index])
                }
            })
            .catch((err) => console.warn(err))




        // uploadedFile === undefined && alert('Ανεβάστε εικόνα')

    }


    const Update_event = (inputData: any) => {
        console.log("🚀 ~ NewEventProvider ~ inputData:", inputData)


        let formData: any = new FormData()

        // let main_bands_array: any = []
        let support_acts_array: any = []


        for (let index in supportActs) {
            support_acts_array.push(supportActs[index]?.profileId)
        }

        let finalData = {
            support_acts: support_acts_array,
            description: inputData.description,
            date: `${inputData.date} ${inputData.time}`
        }


        formData.append('photo', inputData?.file?.[0])



        let update_event = new Call(Routes.events.update(data?.eventId), 'PATCH', finalData)
      

        const updatePhoto = () => {
            let update_event = new Call(Routes.events.update(data?.eventId), 'PATCH', formData)
            update_event.PATCH_MEDIA().then((res) => console.log(res)).catch((err) => console.warn(err))
        }

        update_event
            .PATCH()

            .then((res) => {
                updatePhoto()
                console.log(res)
                console.log('Event updated successfully')
                snackbar('Η εκδήλωση ενημερώθηκε')
            })
            .catch((err) => console.warn(err))

    }





    let contextData = {
        cities,
        modal, setModal,

        all_stages, setSelectedBands,
        selectedBands,
        selectedStage, setSelectedStage,
        handleSubmit,

        height, register, errors,
        customLocation, setCostumLocation,
        stageModal, setStageModal,
        check_img_type, uploadedFile,
        a4Ratio,
        wastedMargin,

        supportModal, setSupportModal,
        supportActs, setSupportActs,
        bands_and_musicians,
        Post_event, Update_event


    }




    return (
        <NewEventContext.Provider value={contextData}>
            {children}
        </NewEventContext.Provider>
    )
}
