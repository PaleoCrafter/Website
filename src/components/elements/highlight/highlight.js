import hljs from 'highlight.js/lib/highlight';

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
hljs.registerLanguage('gradle', require('highlight.js/lib/languages/gradle'));
hljs.registerLanguage('groovy', require('highlight.js/lib/languages/groovy'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('scala', require('highlight.js/lib/languages/scala'));
hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin'));

export default hljs;
