

export const full_date = (value: string) =>
    new Date(value).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })


