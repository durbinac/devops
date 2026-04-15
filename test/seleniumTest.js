const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

describe('Prueba de Humo - App Node', function() {
    let driver;

    before(async function() {
        // Configuramos para que corra en modo "headless" (sin abrir ventana, ideal para Jenkins)
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('Debe mostrar el mensaje de bienvenida', async function() {
        await driver.get('http://localhost:3000'); // URL de tu app en Docker
        let title = await driver.findElement(By.tagName('h1')).getText();
        assert.equal(title, '¡Hola DevOps! Despliegue Exitoso');
    });

    after(async () => await driver.quit());
});