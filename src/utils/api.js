const urlApi = {
    ingredients: "https://norma.nomoreparties.space/api/ingredients",
    order: "https://norma.nomoreparties.space/api/orders"
};

export async function getData(callbackApi, paramsApi) {
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

export function getIngredientsRequest() {
    return fetch(urlApi.ingredients);
}

export function getOrderIdRequest(ingredientsId) {
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
