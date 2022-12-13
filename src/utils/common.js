export function replaceItem(currentIndex, newIndex, array) {
  let result = [];
  const item = array[currentIndex];
  if (currentIndex > newIndex) {
    result = result.concat(
      array.slice(0, newIndex),
      [item],
      array.slice(newIndex, currentIndex),
      array.slice(currentIndex + 1, array.length)
    );
  }
  if (currentIndex < newIndex) {
    result = result.concat(
      array.slice(0, currentIndex),
      array.slice(currentIndex + 1, newIndex + 1),
      [item],
      array.slice(newIndex + 1, array.length)
    );
  }
  return result;
}
