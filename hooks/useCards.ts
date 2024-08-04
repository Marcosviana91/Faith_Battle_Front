// CARDS
const CARD_LIST: CardProps[] = [
    // Artefatos
    {
        slug: "arca-da-alianca",
        path: require("@/assets/images/Cards/Artefatos/Arca da Aliança.png"),
    },
    {
        slug: "arca-de-noe",
        path: require("@/assets/images/Cards/Artefatos/Arca de Noé.png"),
    },
    {
        slug: "botas-do-evangelho",
        path: require("@/assets/images/Cards/Artefatos/Botas do Evangélho.png"),
    },
    {
        slug: "cajado-de-moises",
        path: require("@/assets/images/Cards/Artefatos/Cajado de Moisés.png"),
    },
    {
        slug: "capacete-da-salvacao",
        path: require("@/assets/images/Cards/Artefatos/Capacete da Salvação.png"),
    },
    {
        slug: "cinturao-da-verdade",
        path: require("@/assets/images/Cards/Artefatos/Cinturão da Verdade.png"),
    },
    {
        slug: "couraca-da-justica",
        path: require("@/assets/images/Cards/Artefatos/Couraça da Justiça.png"),
    },
    {
        slug: "escudo-da-fe",
        path: require("@/assets/images/Cards/Artefatos/Escudo da Fé.png"),
    },
    {
        slug: "espada-do-espirito",
        path: require("@/assets/images/Cards/Artefatos/Espada do Espírito.png"),
    },
    {
        slug: "os-10-mandamentos",
        path: require("@/assets/images/Cards/Artefatos/Os 10 Mandamentos.png"),
    },
    // Heróis
    {
        slug: "abraao",
        path: require("@/assets/images/Cards/Heróis/Abraão.png"),
    },
    {
        slug: "adao",
        path: require("@/assets/images/Cards/Heróis/Adão.png"),
    },
    {
        slug: "daniel",
        path: require("@/assets/images/Cards/Heróis/Daniel.png"),
    },
    {
        slug: "davi",
        path: require("@/assets/images/Cards/Heróis/Davi.png"),
    },
    {
        slug: "elias",
        path: require("@/assets/images/Cards/Heróis/Elias.png"),
    },
    {
        slug: "ester",
        path: require("@/assets/images/Cards/Heróis/Ester.png"),
    },
    {
        slug: "eva",
        path: require("@/assets/images/Cards/Heróis/Eva.png"),
    },
    {
        slug: "jaco",
        path: require("@/assets/images/Cards/Heróis/Jacó.png"),
    },
    {
        slug: "jose-do-egito",
        path: require("@/assets/images/Cards/Heróis/José do Egito.png"),
    },
    {
        slug: "josue",
        path: require("@/assets/images/Cards/Heróis/Josué.png"),
    },
    {
        slug: "maria",
        path: require("@/assets/images/Cards/Heróis/MAria.png"),
    },
    {
        slug: "moises",
        path: require("@/assets/images/Cards/Heróis/Moisés.png"),
    },
    {
        slug: "noe",
        path: require("@/assets/images/Cards/Heróis/Noé.png"),
    },
    {
        slug: "salomao",
        path: require("@/assets/images/Cards/Heróis/Salomão.png"),
    },
    {
        slug: "sansao",
        path: require("@/assets/images/Cards/Heróis/Sansão.png"),
    },
    // Lendárias
    {
        slug: "davi-lendario",
        path: require("@/assets/images/Cards/Lendárias/Davi.png"),
    },
    {
        slug: "josue-lendario",
        path: require("@/assets/images/Cards/Lendárias/Josué.png"),
    },
    {
        slug: "moises-lendario",
        path: require("@/assets/images/Cards/Lendárias/Moisés.png"),
    },
    // Milagres
    {
        slug: "cordeiro-de-deus",
        path: require("@/assets/images/Cards/Milagres/Cordeiro de Deus.png"),
    },
    {
        slug: "diluvio",
        path: require("@/assets/images/Cards/Milagres/Dilúvio.png"),
    },
    {
        slug: "fogo-do-ceu",
        path: require("@/assets/images/Cards/Milagres/Fogo do Céu.png"),
    },
    {
        slug: "forca-de-sansao",
        path: require("@/assets/images/Cards/Milagres/Força de Sansão.png"),
    },
    {
        slug: "liberacao-celestial",
        path: require("@/assets/images/Cards/Milagres/Liberação Celestial.png"),
    },
    {
        slug: "no-ceu-tem-pao",
        path: require("@/assets/images/Cards/Milagres/No Céu Tem Pão.png"),
    },
    {
        slug: "passagem-segura",
        path: require("@/assets/images/Cards/Milagres/Passagem Segura.png"),
    },
    {
        slug: "protecao-divina",
        path: require("@/assets/images/Cards/Milagres/Proteção Divina.png"),
    },
    {
        slug: "ressureicao",
        path: require("@/assets/images/Cards/Milagres/Ressurreição.png"),
    },
    {
        slug: "restauracao-de-fe",
        path: require("@/assets/images/Cards/Milagres/Restauração de Fé.png"),
    },
    {
        slug: "sabedoria-de-salomao",
        path: require("@/assets/images/Cards/Milagres/Sabedoria de Salomão.png"),
    },
    {
        slug: "sarca-ardente",
        path: require("@/assets/images/Cards/Milagres/Sarça Ardente.png"),
    },
    // Pecados
    {
        slug: "fruto-proibido",
        path: require("@/assets/images/Cards/Pecados/Fruto Proibido.png"),
    },
    {
        slug: "idolatria",
        path: require("@/assets/images/Cards/Pecados/Idolatria.png"),
    },
    {
        slug: "traicao",
        path: require("@/assets/images/Cards/Pecados/Traição.png"),
    },
    // Sabedoria
    {
        slug: "wisdom_card_0",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.png")
    },
    {
        slug: "wisdom_card_1",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.png")
    },
    {
        slug: "wisdom_card_2",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.png")
    },
]


export function useCards(
    props: { card_slug: string | undefined }
) {
    var default_card = require('@/assets/images/Cards/Card.png')
    var not_defense = require('@/assets/images/Cards/not-defense.png')

    if (!props.card_slug) {
        return default_card
    }
    if (props.card_slug === "not-defense") {
        return not_defense
    }
    for (const card of CARD_LIST) {
        if (card.slug === props.card_slug) {
            return card.path
        }
    }
}