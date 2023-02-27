import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" })

export async function fetchOrders(setOrders) {
    try {
        const result = await axiosInstance.get('/orders', { withCredentials: true })
        setOrders(result.data.orders)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export async function loggedStatus(loggedIn, setLoggedIn, setUser) {
    try {
        const loggStatus = await axiosInstance.get('/logged_in', { withCredentials: true })
        if (loggStatus.data.logged_in && loggedIn === false) {
            setLoggedIn(true)
            console.log('use effect trigger')
            setUser(loggStatus.data.user)
            return loggStatus.data
        } else if (!loggStatus.data.logged_in && loggedIn === true) {
            setLoggedIn(false)
            setUser({})
        }
    } catch (error) {
        console.log(error)
    }
}

export async function productShops(shops, triggered, setTriggered, setShops) {
    try {
        const result = await axiosInstance.get('/shops')
        if (result.data.products !== shops && triggered === false) {
            setShops(result.data.products)
            setTriggered(true)
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function creatProduct(product) {
    try {
        const result = await axiosInstance.post('/products', product, { withCredentials: true })
        return result.data
    } catch (error) {
        console.log(error)
    }
}


export async function deleteProduct(id) {
    try {
        const result = await axiosInstance.delete(`/products/${id}`, { withCredentials: true })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export async function fetchIndexProducts(products, triggered, setProducts, setTriggered) {
    try {
        const result = await axiosInstance.get('/products', { withCredentials: true })
        if (result.data.products !== products && triggered === false) {
            setProducts(result.data.products)
            setTriggered(true)
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function editOrderitem(quantity, id) {
    try {
        const result = axiosInstance.patch(`/order_items/${id}`, {
            order_item: {
                quantity: quantity,
            }
        }, { withCredentials: true })
        return result.data
    } catch (error) {
        console.log(error)
    }
}


export async function fetchCart(cart, triggered, setTriggered, setCart, setMessage) {
    try {
        const result = await axiosInstance.get(`/cart`, { withCredentials: true })
        if (result.data !== cart && triggered === false) {
            setCart(result.data)
            setTriggered(true)
            return result.data
        } else if (result.data.connected === false) {
            setMessage(result.data.message)
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function checkout(total, user, resetCart) {
    try {
        const result = await axiosInstance.post('/orders', {
            order: {
                total: total,
                user_id: user.id
            }
        }, { withCredentials: true })
        resetCart()
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export async function addProductToCart(data, setMessage) {
    try {
        const result = await axiosInstance.post('/order_items', data, { withCredentials: true })
        setMessage(result.data.message)
        return result.data
    } catch (error) {
        console.log(error)
    }
}


export async function removeProdFromCart(id) {
    try {
        const result = await axiosInstance.delete(`/order_items/${id}`, { withCredentials: true })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

