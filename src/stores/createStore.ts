import './mobxConfig'
import { History } from 'history'
import { RouterStore, UserStore } from '.'

import { STORE_ROUTER, USER_ROUTER } from '../constants'

export function createStores(history: History) {
	const routerStore = new RouterStore(history)
	const userStore = new UserStore()

	return {
		[STORE_ROUTER]: routerStore,
		[USER_ROUTER]: userStore,
	}
}
