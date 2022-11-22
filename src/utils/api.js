const urlApi ={
    ingridients: "https://norma.nomoreparties.space/api/ingredients",
    order:"https://norma.nomoreparties.space/api/orders"
};

export const getData = async (callbackApi, paramsApi, callbackState) => {
    callbackState[1]({...callbackState[0], hasError: false, isLoading: true});
    try {
        const res = await callbackApi(paramsApi);
        if (!res.ok) {
            throw new Error('Сервер вернул ошибочный ответ')
        }
        const resData = await res.json();
        resData.success ?
            callbackState[1]({hasError: false, data: resData, isLoading: false}) :
            (() => {
                throw new Error('Ответ от сервера не `success`')
            })();
    } catch (err) {
        callbackState[1]({...callbackState[0], hasError: true, isLoading: false});
    }
};

export function getIngridients()
{
    return fetch(urlApi.ingridients);
}

export function getOrderId(ingridientsId)
{
    return fetch(urlApi.order, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            ingredients: ingridientsId})
    })
}
