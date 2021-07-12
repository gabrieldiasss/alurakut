import MainGrid from './src/components/MainGrid'
import Box from './src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from './src/components/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from './src/components/ProfileRelations'

function ProfileSidebar({ user }) {

	return (
		<Box>
			<img src={`https://github.com/${user}.png`} style={{borderRadius: '16px'}} />
		</Box>
	)
}

export default function Home() {

	const gitHubUser = 'gabrieldiasss'
	const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']

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
				</div>
				
				<div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }} >
					<ProfileRelationsBoxWrapper>
						<h2 className="smallTitle" >
							Pessoas da comunidade ({pessoasFavoritas.length})
						</h2>
						
						<ul>
							{pessoasFavoritas.map((itemAtual) => {
								return (
									<li>
										<a href={`/users/${itemAtual}`} key={itemAtual} >
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
