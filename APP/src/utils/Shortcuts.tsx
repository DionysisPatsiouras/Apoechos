

export const full_date = (value: string) =>
    new Date(value).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })

export const numeric_date = (value: string) =>
    new Date(value).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "long"
    })
export const day_date = (value: string) =>
    new Date(value).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "numeric",
        // day: "numeric",
        weekday: "long"
        
    })

export const timestamp = (value: string) =>
    new Date(value).toLocaleTimeString("el-GR", {
        hour: "numeric",
        minute: "numeric"
    });

export const message_date = (value: string) =>
    new Date(value).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        // weekday: "long",
        hour: "numeric",
        minute: "numeric"
    })
