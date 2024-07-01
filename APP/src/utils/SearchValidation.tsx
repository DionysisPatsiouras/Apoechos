// SYNTAX
// 
// SearchValidation(data?.fdlName, search)


const SearchValidation = (data: any, state: any) => {


    return data?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(state) ||
        data?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(state) ||
        data?.toLowerCase().includes(state) ||
        data?.toUpperCase().includes(state) ||
        data?.includes(state)


}


export default SearchValidation