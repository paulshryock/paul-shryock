---js
{
	changelog: require('fs').readFileSync('./CHANGELOG.md'),
	slug: 'changelog',
}
---
{{ changelog }}
