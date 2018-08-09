class ProxyFactory {
    static create(objeto, props, armadilha) {
        return new Proxy(objeto, {
            get(target, prop) {
                if (typeof target[prop] === typeof Function && props.includes(prop)) {
                    return function() {
                        console.log(`${prop} disparou a armadilha`);
                        target[prop].apply(target, arguments);
                        armadilha(target);
                    }
                } else {
                    return target[prop];
                }
            }
        });
    }
}
