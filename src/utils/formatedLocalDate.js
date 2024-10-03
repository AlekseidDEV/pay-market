
export const formatedLocalDate = (date) => {
    const formateDate =  new Date(date * 1000).toLocaleDateString()
    const formateTime =  new Date(date * 1000).toLocaleTimeString().slice(0, -3)

    return {formateTime, formateDate}
}