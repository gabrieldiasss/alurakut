import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {

    if(request.method === "POST" ) {

        const TOKEN = "e24b8954568e5a363ee83da0c041cd";
        const client = new SiteClient(TOKEN)

        const registroCriado = await client.items.create({
            itemType: '967566',
            ...request.body,
            /* title: "Comunidade",
            imageUrl: "https://gabrieldiasss.png",
            creatorSlug: "gabrieldiasss" */
        })

        console.log(registroCriado)

        response.json({
            dados: "Algum dado qualquer",
            registroCriado: registroCriado,
        })

    }
    
    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })

}