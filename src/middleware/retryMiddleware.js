const isPromise = (value) =>
  value !== null &&
    ( typeof value === "function") ;

/// Если экшен это массив из двух функций, возвращающих промисы, выполняет первый промис
/// если не было ошибок заканчивает выполнение экшена
/// если были ошибки - пытается выполнить второй промис. В случае успеха поторно запускает обработку первого промиса
export function retryMiddleware() {
  const middleware = function middleware(store) {
    return function (next) {
      return async function (action) {
        if (Array.isArray(action) && action.length === 2 && isPromise(action[0]) && isPromise(action[1])) {
          store.dispatch(action[0]).catch((err) => {
            console.log(`${err}`);
            store
              .dispatch(action[1])
              .then((res) =>
                store.dispatch(action[0]).catch((err) => {
                  console.log(`${err}`);
                })
              )
              .catch((err) => {
                console.log(`${err}`);
              });
          });
        } else {
          return next(action);
        }
      };
    };
  };
  return middleware;
}

const retry = retryMiddleware();
export default retry;
