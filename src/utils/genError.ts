export default (msg: string, errors: any[], code?: number) => ({
    error: true,
    message: msg,
    errors,
    code: code || 500
})