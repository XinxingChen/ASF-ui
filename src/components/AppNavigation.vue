<template>
	<nav class="side-navigation" @transitionend="onTransitionEnd">
		<template v-if="authenticated">
			<div class="navigation-category">
				<navigation-category-title :name="$t('control')"></navigation-category-title>
				<navigation-link :name="$t('bots')" icon="users" :to="{ name: 'bots' }"></navigation-link>
				<navigation-link :name="$t('commands')" icon="laptop" :to="{ name: 'commands' }"></navigation-link>
				<navigation-link :name="$t('log')" icon="file-alt" :to="{ name: 'log' }"></navigation-link>
				<navigation-link :name="$t('releases')" icon="code-branch" :to="{ name: 'releases' }"></navigation-link>
			</div>

			<div class="navigation-category">
				<navigation-category-title :name="$t('configuration')"></navigation-category-title>
				<navigation-link :name="$t('ui-configuration')" icon="wrench" :to="{ name: 'ui-configuration' }"></navigation-link>
				<navigation-link :name="$t('global-config')" icon="edit" :to="{ name: 'global-config' }"></navigation-link>
			</div>

			<div class="navigation-category navigation-category--pull-bottom">
				<navigation-category-title :name="$t('statistics')"></navigation-category-title>
				<navigation-bots ref="bots"></navigation-bots>
				<navigation-statistics></navigation-statistics>
			</div>
		</template>

		<template v-else>
			<div class="navigation-category">
				<navigation-category-title :name="$t('configuration')"></navigation-category-title>
				<navigation-link :name="$t('setup')" icon="wrench" :to="{ name: 'setup' }"></navigation-link>
			</div>
		</template>
	</nav>
</template>

<script>
	import NavigationLink from './NavigationLink.vue';
	import NavigationCategoryTitle from './NavigationCategoryTitle.vue';
	import NavigationBots from './NavigationBots.vue';
	import NavigationStatistics from './NavigationStatistics.vue';

	import { mapGetters } from 'vuex';

	export default {
		name: 'app-navigation',
		components: { NavigationLink, NavigationCategoryTitle, NavigationStatistics, NavigationBots },
		computed: mapGetters({
			authenticated: 'auth/authenticated',
			smallNavigation: 'layout/smallNavigation'
		}),
		watch: {
			smallNavigation: {
				handler(value) {
					this.onTransitionStart();
				}
			}
		},
		methods: {
			onTransitionStart() {
				if (!this.$refs.bots) return;
				this.$refs.bots.onTransitionStart();
			},
			onTransitionEnd() {
				if (!this.$refs.bots) return;
				this.$refs.bots.onTransitionEnd();
			}
		}
	};
</script>

<style lang="scss">
	.side-navigation {
		background: var(--color-navigation);
		bottom: 0;
		display: flex;
		flex-direction: column;
		left: 0;
		overflow: hidden;
		padding-top: var(--navigation-height);
		position: fixed;
		top: 0;
		transition: ease-in-out width .3s;
		width: var(--navigation-width);
		z-index: 1001;

		.app--small-navigation & {
			overflow: initial;
		}

		.app--boxed-layout & {
			@media screen and (min-width: 1250px) {
				position: absolute;
			}
		}
	}

	.navigation-category--pull-bottom {
		margin-top: auto;
	}
</style>
