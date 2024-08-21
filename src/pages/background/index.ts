import packageJson from "../../../package.json";

chrome.tabs.onCreated.addListener(async () => {
  //@ts-ignore
  const response = await fetch(packageJson.repository.api);
  const res = await response.json();
  const { name, description, owner } = res;
  setTimeout(() => {
    console.log(`Extension name: ${name}`);
    console.log(`Extension Description: ${description}`);
    console.log(`Developed by ${owner.login}`);
  }, 100);
});
