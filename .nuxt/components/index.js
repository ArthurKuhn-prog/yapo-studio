import { wrapFunctional } from './utils'

export { default as Logo } from '../../components/Logo.vue'
export { default as TitleCard } from '../../components/title-card.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyTitleCard = import('../../components/title-card.vue' /* webpackChunkName: "components/title-card" */).then(c => wrapFunctional(c.default || c))
