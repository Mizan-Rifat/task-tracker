import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV2 = {
  manifest_version: 2,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: [
    "storage",
    "tabs",
    "cookies",
    "activeTab",
    "declarativeContent",
    "http://*/*",
    "https://*/*",
  ],
  background: {
    scripts: ["src/pages/background/index.js"],
    persistent: false,
  },
  browser_action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png",
  },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],

  content_security_policy: `script-src 'self' 'unsafe-eval' ${packageJson.repository.api} ;`,
  web_accessible_resources: [
    "assets/svg/*.svg",
    "assets/jpeg/*.jpeg",
    "assets/js/*.js",
    "assets/css/*.css",
    "icon-128.png",
    "icon-34.png",
  ],
};

export default manifest;
