const axios = require('axios');
const FormData = require('form-data');

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
        const getResponse = await axios.get('https://confutsudamericana.com/premiacoes/votacao');
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
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

setInterval(realizarVotacao, 1000);
