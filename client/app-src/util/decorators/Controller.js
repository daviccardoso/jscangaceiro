export function controller(...seletores) {
  const elements = seletores.map(seletor => document.querySelector(seletor));

  return function(constructor) {
    const constructorOriginal = constructor;

    const constructorNovo = function() {
      return new constructorOriginal(...elements);
    }

    constructorNovo.prototype = constructorOriginal.prototype;

    return constructorNovo;
  }
}
