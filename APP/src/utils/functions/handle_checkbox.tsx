
export const handle_checkbox = (setArray:any, event: any) => {
    const { value, checked } = event;
    setArray((prevCategories: any) =>
        checked
            ? [...prevCategories, value]
            : prevCategories.filter((all_values: any) => all_values !== value)
    )
}