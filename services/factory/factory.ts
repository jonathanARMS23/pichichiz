/* eslint-disable prefer-destructuring */

export const verify = (subject: any) => {
    if (!subject || subject === '') return false
    return true
}

export const castArray = (value: any) => {
    if (Array.isArray(value)) return value
    return value ? [value] : []
}
