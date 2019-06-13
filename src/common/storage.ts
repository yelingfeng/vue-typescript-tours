const globalObj: any = {}

class WebStorage {
    storage: Storage;
    constructor(storage: Storage) {
        this.storage = storage
    }
    get(key: string) {
        const valueStr: string | any = this.storage.getItem(key)
        try {
            return JSON.parse(valueStr)
        } catch (e) {
            return valueStr
        }
    }
    set(key: string, value: any) {
        const valueStr = typeof value === 'string' ? value : JSON.stringify(value)
        return this.storage.setItem(key, valueStr)
    }
    remove(key: string) {
        this.storage.removeItem(key)
    }
    removeAll() {
        this.storage.clear()
    }
}

export const storage = {
    local: new WebStorage(window.localStorage),
    session: new WebStorage(window.sessionStorage),
    memory: {
        get(key: string | number) {
            return globalObj[key]
        },
        set(key: string | number, value: any) {
            globalObj[key] = value
        },
        remove(key: string | number) {
            globalObj[key] = undefined
        },
        removeAll() {
            Object.keys(globalObj).forEach(key => {
                globalObj[key] = undefined
            })
        }
    }
}
