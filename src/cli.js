import pegaArquivo from "./index.js"
import chalk from "chalk"
import fs from "fs"

const caminho = process.argv

const imprimeLista = resultado => {
	console.log(chalk.yellow("lista de links"), resultado)
}

const processaTexto = async argumentos => {
	const caminho = argumentos[2]

	if (fs.lstatSync(caminho).isFile()) {
		const resultado = await pegaArquivo(caminho)
		imprimeLista(resultado)
	} else if (fs.lstatSync(caminho).isDirectory()) {
		const arquivos = await fs.promises.readdir(caminho)
		arquivos.forEach(async nomeArquivo => {
			const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`)
			imprimeLista(lista)
		})
		console.log(arquivos)
	}
}

processaTexto(caminho)
