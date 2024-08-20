const axios = require('axios');
const FormData = require('form-data');

const userAgents = [
    // Windows
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/91.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.64',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',

    // macOS
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',

    // Linux
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/90.0',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',

    // iOS
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1',

    // Android
    'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 9; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36',

    // Edge on Android
    'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36 EdgA/45.9.2.2936',

    // Chrome OS
    'Mozilla/5.0 (X11; CrOS x86_64 13099.91.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.136 Safari/537.36',
    'Mozilla/5.0 (X11; CrOS armv7l 12607.58.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.105 Safari/537.36',

    // Firefox on Android
    'Mozilla/5.0 (Android 11; Mobile; rv:89.0) Gecko/89.0 Firefox/89.0',
    'Mozilla/5.0 (Android 10; Mobile; LG-M255; rv:84.0) Gecko/84.0 Firefox/84.0'
];

function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}


function gerarNomeAleatorio() {
    const nomes = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Luiza', 'Paulo', 'Fernanda', 'Rafael', 'Camila'];
    const sobrenomes = ['Silva', 'Souza', 'Oliveira', 'Santos', 'Pereira', 'Costa', 'Ribeiro', 'Almeida', 'Nascimento', 'Carvalho'];
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`;
}

function gerarEmailAleatorio(nome) {
    const dominios = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const dominio = dominios[Math.floor(Math.random() * dominios.length)];
    const username = nome.toLowerCase().replace(' ', '') + Math.floor(Math.random() * 1000);
    return `${username}@${dominio}`;
}

function gerarTelefoneAleatorio() {
    const ddd = Math.floor(Math.random() * 90 + 10);
    const prefixo = Math.floor(Math.random() * 9000 + 1000);
    const sufixo = Math.floor(Math.random() * 9000 + 1000);
    return `${ddd}${prefixo}${sufixo}`;
}

async function realizarVotacao() {
    try {
        const headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': getRandomUserAgent()
        };
        const getResponse = await axios.get('https://confutsudamericana.com/premiacoes/votacao', {
            headers: headers
        });
        const cookies = getResponse.headers['set-cookie'].join('; ');
        const nome = gerarNomeAleatorio();
        const email = gerarEmailAleatorio(nome);
        const telefone = gerarTelefoneAleatorio();
        const key = "69584fsa434cw345654fsdf_";

        //console.log(`\nNome: ${nome}`);
        //console.log(`Email: ${email}`);
        //console.log(`Telefone: ${telefone}`);

        const form = new FormData();
        form.append('cat_1', '1');
        form.append('cat_2', '1');
        form.append('cat_3', '3');
        form.append('cat_4', '1');
        form.append('cat_5', '3');
        form.append('cat_6', '2');
        form.append('cat_7', '2');
        form.append('cat_8', '3');
        form.append('cat_9', '3');
        form.append('cat_10', '3');
        form.append('cat_11', '3');
        form.append('cat_12', '2');
        form.append('cat_13', '3');
        form.append('cat_14', '2');
        form.append('cat_15', '3');
        form.append('cat_16', '2');
        form.append('cat_17', '1');
        form.append('cat_18', '3');
        form.append('cat_19', '1');
        form.append('cat_20', '1');
        form.append('email', email);
        form.append('empresa', 'Torcedor');
        form.append('fone', telefone);
        form.append('key', key);
        form.append('nome', nome);

        const postResponse = await axios.post('https://confutsudamericana.com/votacao/confirma', form, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'Origin': 'https://confutsudamericana.com',
                'Referer': 'https://confutsudamericana.com/premiacoes/votacao',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': getRandomUserAgent(),
                'Cookie': cookies
            }
        });
        try {
            const html = postResponse.data
            const regex = /alert\(['"](.+?)['"]\);/;
            const match = html.match(regex);
    
            if (match) {
                console.log(`Resposta: ${match[1]}`);
            } else {
                console.log('Nenhum alert encontrado.');
            }
        } catch (error) {
            console.error('Erro ao obter o conteudo:', error);
        }
    } catch (error) {
        console.error('Erro ao realizar a votacao:', error);
    }
}

setInterval(realizarVotacao, 5000);
