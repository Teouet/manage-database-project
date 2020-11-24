export const getTokenFrom = request => {
    console.log(request.get('authorization'))
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
export const addSpaceToCardNumber = (cardNumber) => {
    let result = ""
    for (let i = 0; i < cardNumber.length; i++) {
        result += cardNumber[i]
        if (i % 4 === 3 && i !== cardNumber.length - 1) {
            result += " "
        }
    }
    return result
}