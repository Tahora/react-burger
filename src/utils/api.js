const urlApi = {
    ingredients: "https://norma.nomoreparties.space/api/ingredients",
    order: "https://norma.nomoreparties.space/api/orders"
};

export const loadDataToState = async (callbackApi, paramsApi, callbackState) => {
    callbackState[1]({...callbackState[0], hasError: false, isLoading: true});
    try {
        const result = await getData(callbackApi, paramsApi);
        callbackState[1]({hasError: false, data: result, isLoading: false});
    } catch (err) {
        callbackState[1]({...callbackState[0], hasError: true, isLoading: false});
    }
};

async function getData(callbackApi, paramsApi) {
    const res = await callbackApi(paramsApi);
    if (!res.ok) {
        throw new Error('Сервер вернул ошибочный ответ')
    }
    const data = await res.json();
    if (!data.success) {
        throw new Error('Ответ от сервера не `success`');
    }
    return data;
}

export function getIngredients() {
    return fetch(urlApi.ingredients);
}

export function getOrderId(ingredientsId) {
    return fetch(urlApi.order, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredientsId
        })
    })
}
