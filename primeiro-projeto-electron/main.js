const path = require('path');
const { app, BrowserWindow } = require('electron');

const criarJanela = () => {
    const janela = new BrowserWindow({
        width: 600,
        height: 400,

        webPreferences: {
            // __dirname aponta para a pasta raiz, arquivo em execução
            // path.join cria um caminho, unindo todos
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //janela.loadURL('https://github.com')
    janela.loadFile('index.html')
}

// quando o programa desktop for fechado, automaticamento o programa é finalizado!
app.on('window-all-closed', () => {
    // se não for uma plataforma 'darwin' - macOS, o programa sera finalizado!
    // nesse caso windows ou linux
    if(process.platform !== 'darwin') app.quit()
})

// a janela sera executada quando o app esperar a leitura da sua estrutura com whenReady, assim criando a janela 'index.html'
app.whenReady().then(() => {
    criarJanela()

    // app.on utilizando o recurso activate vai permitir monitorar recursos no app.
    app.on('activate', () => {
        // no caso do mac, o programa não é finalizado quando a janela é fechada, assim ficando em execução sem ter uma janela aberta.
        // para resolver isso é criado uma nova janela.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

