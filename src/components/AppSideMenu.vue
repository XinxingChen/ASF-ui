<template>
	<aside class="side-menu" :class="{ 'side-menu--hidden': !sideMenu }">
		<side-menu-switch class="side-menu__switch--boxed" :name="$t('sidebar-boxed-layout')" icon="square" :checked="boxedLayout" @click="toggleBoxed"></side-menu-switch>
		<side-menu-switch :name="$t('sidebar-dark-mode')" icon="moon" :checked="darkMode" @click="toggleDarkMode"></side-menu-switch>

		<div class="side-menu__category">
			<font-awesome-icon icon="palette" fixed-width></font-awesome-icon>
			<span>{{ $t('sidebar-theme') }}</span>
		</div>

		<div class="theme-switcher">
			<div class="theme-switcher__theme" :class="[`theme-${theme}`]" v-for="theme in availableThemes" @click="changeTheme(theme)"></div>
		</div>
	</aside>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	import SideMenuSwitch from './SideMenuSwitch.vue';

	export default {
		name: 'app-side-menu',
		components: { SideMenuSwitch },
		computed: mapGetters({
			sideMenu: 'layout/sideMenu',
			availableThemes: 'layout/availableThemes',
			boxedLayout: 'layout/boxed',
			darkMode: 'layout/darkMode'
		}),
		methods: mapActions({
			changeTheme: 'layout/changeTheme',
			toggleBoxed: 'layout/toggleBoxed',
			toggleDarkMode: 'layout/toggleDarkMode'
		})
	};
</script>

<style lang="scss">
	.side-menu {
		background: var(--color-navigation);
		bottom: 0;
		padding-top: var(--navigation-height);
		position: fixed;
		right: -15em;
		top: 0;
		transition: transform ease-in-out .3s;
		transform: translate(-15em, 0);
		width: 15em;
		z-index: 1001;

		.app--boxed-layout & {
			@media screen and (min-width: 1250px) {
				position: absolute;
			}
		}
	}

	.side-menu--hidden {
		transform: none;
	}

	.theme-switcher {
		display: grid;
		grid-gap: 0.5em;
		grid-template-columns: repeat(6, 1fr);
		padding: 1em;
	}

	.theme-switcher__theme {
		background: var(--color-theme);
		border: 3px solid var(--color-theme);
		border-radius: 4px;
		box-sizing: border-box;
		cursor: pointer;
		height: 20px;
		margin: auto;
		transition: background .3s;
		width: 20px;

		&:hover {
			background: var(--color-theme-dark);
		}
	}

	.side-menu__category {
		box-sizing: border-box;
		color: var(--color-text-secondary);
		margin: 1em 0 0.5em;
		padding: 0 1em;
	}

	.side-menu__switch--boxed {
		@media screen and (max-width: 1249px) {
			display: none;
		}
	}
</style>
