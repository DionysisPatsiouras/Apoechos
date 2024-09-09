import FormError from "../utils/FormError"

export default function TextField({ label, register, name, required, errors, min, max }: any) {
    return (
        <div className="column">
            <label>{label} </label>
            <input type='text' {...register(name, {
                required: required ? 'Υποχρεωτικό πεδίο' : false,
                minLength: {
                    value: min,
                    message: 'Πολύ μικρό κείμενο'
                },
                maxLength: {
                    value: max,
                    message: 'Πολύ μεγάλο κείμενο'
                }
            })} />

            <FormError value={errors[name]} />
        </div>

    )
}