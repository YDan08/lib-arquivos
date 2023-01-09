import chalk from "chalk"

const extrairLinks = arrLinks => {
	return arrLinks.map(objetoLink => Object.values(objetoLink).join())
}

const checaStatus = async listaUrl => {
	const arrStatus = await Promise.all(
		listaUrl.map(async url => {
			try {
				const response = await fetch(url)
				return response.status
			} catch (erro) {
				return manejaErros(erro)
			}
		})
	)
	return arrStatus
}

const manejaErros = erro => {
	if (erro.cause.code === "ENOTFOUND") {
		return "link não encontrado"
	} else {
		return "ocorreu algum erro"
	}
}

const listaValidada = async listaDeLinks => {
	const links = extrairLinks(listaDeLinks)
	const status = await checaStatus(links)
	return listaDeLinks.map((objeto, indice) => ({
		...objeto,
		status: status[indice],
	}))
}

export default listaValidada

/*
 */
