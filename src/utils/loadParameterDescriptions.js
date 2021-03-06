import fetchWiki from './fetchWiki';
import { getLocaleForWiki } from './getLocaleForWiki';
import * as storage from './storage';

export default async function loadParameterDescriptions(version, locale) {
	const descriptionsCache = storage.get(`cache:parameter-descriptions:${locale}`);
	if (descriptionsCache) {
		const { timestamp, descriptions } = descriptionsCache;
		if (timestamp > Date.now() - 24 * 60 * 60 * 1000) return descriptions;
	}

	const descriptions = {};

	const configWiki = await fetchWiki('Configuration', version);
	const wikiHTML = document.createElement('html');
	wikiHTML.innerHTML = configWiki;
	const parametersHTML = Array.from(wikiHTML.querySelectorAll('h3 > code'));

	for (const parameterHTML of parametersHTML) {
		const parameterName = parameterHTML.innerText;

		const parameterDescription = [];
		let description = parameterHTML.parentElement.nextElementSibling;

		while (description && description.tagName.toLowerCase() !== 'hr') {
			const wikiLinks = description.querySelectorAll('a[href^="#"]');
			fixWikiLinks(wikiLinks, 'Configuration');
			parameterDescription.push(description.outerHTML);
			description = description.nextElementSibling;
		}

		descriptions[parameterName] = parameterDescription.join(' ');
	}

	storage.set(`cache:parameter-descriptions:${locale}`, { timestamp: Date.now(), descriptions });

	return descriptions;
}

export function fixWikiLinks(links, page) {
	const locale = getLocaleForWiki();

	for (const link of links ) {
		if (link) {
			link.setAttribute('href', `https://github.com/JustArchiNET/ArchiSteamFarm/wiki/${page}${locale}${link.hash}`);
			link.setAttribute('target', '_blank');
		}
	}
}
