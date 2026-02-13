const { createApp } = Vue;

const papersService = new PapersService();

const papersController = new PapersController(papersService);

const appConfig = papersController.createAppConfig();
createApp(appConfig).mount('#app');
