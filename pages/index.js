import React from 'react'

import MainGrid from './src/components/MainGrid'
import Box from './src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from './src/components/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from './src/components/ProfileRelations'

function ProfileSidebar({ user }) {

	return (
		<Box>
			<img src={`https://github.com/${user}.png`} style={{borderRadius: '16px'}} />

			<hr />
			<p>
				<a className="boxLink" href={`https://github.com/${user}`}>
					@{user}
				</a>
			</p>
			<hr />

			<AlurakutProfileSidebarMenuDefault />
			
		</Box>
	)
}

function ProfileRelationsBox({ title, items }) {

	return (

		<ProfileRelationsBoxWrapper>

				<h2 className="smallTitle" >
					{title}({items.length})
				</h2>

				<ul>
					{/* {seguidores.map((itemAtual) => {
						return (
							<li key={itemAtual.id} >
								<a href={`/users/${itemAtual.title}`} key={itemAtual.title} >
									<img src={itemAtual.image} />
									<span>{itemAtual.title}</span>
								</a>
							</li>
							
						)
					})} */}
				</ul>

		</ProfileRelationsBoxWrapper>
	)
}

export default function Home() {

	React.useEffect(() => {

		fetch('https://api.github.com/users/peas/followers')
		.then((respostaDoServidor) => {
			return respostaDoServidor.json()
		})

		.then((response) => {
			setSeguidores(response)
		})

		//Api GraphQL
		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				'Authorization': 'f55491e0ee81632831f8dcee0ad1b1',
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ "query": `query {
				allCommunities {
				  title
				  id
				  imageUrl
				  creatorSlug
				}
			  }` })
		})
		.then((response) => response.json())
		.then((respostaCompleta) => {
			const comunidadesVindasDoDato = respostaCompleta.data.allCommunities

			setComunidades(comunidadesVindasDoDato)
			console.log(respostaCompleta)
		})

	}, [])

	const [ comunidades, setComunidades ] = React.useState([])

	console.log(comunidades)

	const gitHubUser = 'gabrieldiasss'
	const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']

	const [seguidores, setSeguidores] = React.useState([])

	return (
		<>
			<AlurakutMenu />
			<MainGrid>
				<div className="profileArea" style={{ gridArea: 'profileArea' }} >
					<ProfileSidebar user={gitHubUser} />
				</div>
				
				<div className="welcomeArea" style={{ gridArea: 'welcomeArea' }} >
					<Box className="title" >
						<h1>
							Bem vindo(a)
						</h1>

						<OrkutNostalgicIconSet />
					</Box>

					<Box>
						<h2>Oque você deseja fazer</h2>

						<form onSubmit={function handleCriaComunidade(e) {
							e.preventDefault()

							const dadosDoForm = new FormData(e.target)

							console.log(dadosDoForm.get('title'))
							console.log(dadosDoForm.get('image'))

							const comunidade = {
								title: dadosDoForm.get('title'),
								imageUrl: dadosDoForm.get('image'),
								creatorSlug: gitHubUser,

							}

							fetch('/api/comunidades', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(comunidade)
							})
							.then(async (response) => {
								const dados = await response.json()
								console.log(dados.registroCriado)
								const comunidade = dados.registroCriado
								const comunidadesAtualizadas = [...comunidades, comunidade]
								setComunidades(comunidadesAtualizadas)
							})

							
						}} >
							<div>
								<input 
									placeholder="Qual vai ser o nome da sua comunidade?" 
									name="title" 
									arial-label=""
									type="text"
								/>
							</div>
							
							<div>
								<input 
									placeholder="Coloque uma URL para usarmos de capa" 
									name="image" 
									arial-label=""
									type="text"
								/>
							</div>

							<button>
								Criar Comunidade
							</button>
						</form>
						
					</Box>
				</div>
				
				<div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }} >
				<ProfileRelationsBox title="Seguidores" items={seguidores} />
				<ProfileRelationsBoxWrapper>

						<h2 className="smallTitle" >
							Comunidades ({comunidades.length})
						</h2>

						<ul>
							{comunidades.map((itemAtual) => {
								return (
									<li key={itemAtual.id} >
										<a href={`/comunities/${itemAtual.title}`} key={itemAtual.id} >
											<img src={itemAtual.imageUrl} />
											<span>{itemAtual.title}</span>
										</a>
									</li>
									
								)
							})}
						</ul>
						
					</ProfileRelationsBoxWrapper>

					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle" >
							Pessoas da comunidade ({pessoasFavoritas.length})
						</h2>
						
						<ul>
							{pessoasFavoritas.map((itemAtual) => {
								return (
									<li key={itemAtual} >
										<a href={`/users/${itemAtual.title}`}  >
											<img src={`https://github.com/${itemAtual}.png`} />
											<span>{itemAtual}</span>
										</a>
									</li>
									
								)
							})}
						</ul>
						
					</ProfileRelationsBoxWrapper>
				</div>

			</MainGrid>
		</>
	) 
}
