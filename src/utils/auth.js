import store from 'store';

// 设置和得到登录以后的TOKEN
export function setToken(value) {
	store.set('token', value)
}

export function getToken() {
	return store.get('token')
}

export function removeToken() {
	return store.remove('token')
}