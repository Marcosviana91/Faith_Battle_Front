import { useScreenSizes } from "./useScreenSizes"

// CARDS
const CARD_LIST: CardProps[] = [
    // Artefatos
    {
        slug: "arca-da-alianca",
        path: require("@/assets/images/Cards/Artefatos/Arca da Aliança.png"),
        description: "Todos os heróis na sua ZB ganham 1/1.",
    },
    {
        slug: "arca-de-noe",
        path: require("@/assets/images/Cards/Artefatos/Arca de Noé.png"),
        description: "O Herói equipado é indestrutível.",
    },
    {
        slug: "botas-do-evangelho",
        path: require("@/assets/images/Cards/Artefatos/Botas do Evangélho.png"),
        description: "Quando o Herói equipado atacar, compre uma carta.",
    },
    {
        slug: "cajado-de-moises",
        path: require("@/assets/images/Cards/Artefatos/Cajado de Moisés.png"),
        description: "O Herói equipado ganha 1/0. Se está equipado a Moisés, seus milagres custam -1 de sabedoria.",
    },
    {
        slug: "capacete-da-salvacao",
        path: require("@/assets/images/Cards/Artefatos/Capacete da Salvação.png"),
        description: "O Herói equipado recebe 1/0 e é incorruptível.",
    },
    {
        slug: "cinturao-da-verdade",
        path: require("@/assets/images/Cards/Artefatos/Cinturão da Verdade.png"),
        description: "Quando o Herói equipado atacar, o jogador alvo revela a carta do topo do seu deck e perde pontos de Fé igual ao custo de sabedoria desta carta.",
    },
    {
        slug: "couraca-da-justica",
        path: require("@/assets/images/Cards/Artefatos/Couraça da Justiça.png"),
        description: "O Herói equipado ganha 2/2.",
    },
    {
        slug: "escudo-da-fe",
        path: require("@/assets/images/Cards/Artefatos/Escudo da Fé.png"),
        description: "O Herói equipado ganha 0/2.",
    },
    {
        slug: "espada-do-espirito",
        path: require("@/assets/images/Cards/Artefatos/Espada do Espírito.png"),
        description: "O Herói equipado ganha 1/0 e é imbloqueável.",
    },
    {
        slug: "os-10-mandamentos",
        path: require("@/assets/images/Cards/Artefatos/Os 10 Mandamentos.png"),
        description: "Suas cartas custam -1 de Sabedoria para serrem jogadas.",
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
        slug: "ressurreicao",
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


export function getCardDescription(
    card_slug: string | undefined
) {

    if (card_slug) {
        for (const card of CARD_LIST) {
            if (card.slug === card_slug) {
                return card.description
            }
        }

    }
    return ""
}
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

export function getCardInList(card_id: string | undefined, card_list: CardProps[] | undefined): CardProps | undefined {
    let card = undefined;
    if (card_id == undefined || card_list == undefined) { return card }
    card_list.map(_card => {
        if (_card.in_game_id == card_id) {
            card = _card
        }
    })
    return card
}

// Elias OnInvoke
export function getCardInListBySlug(card_slug: string | undefined, card_list: CardProps[] | undefined): CardProps | undefined {
    let card = undefined;
    if (card_slug == undefined || card_list == undefined) { return card }
    card_list.map(_card => {
        if (_card.slug == card_slug) {
            card = _card
        }
    })
    return card
}

export function isCardInList(card_id: string | undefined, card_list: CardProps[] | undefined) {
    let card_founded = false;
    if (card_id == undefined || card_list == undefined) { return card_founded }
    card_list.map(_card => {
        if (_card.in_game_id == card_id) {
            card_founded = true;
        }
    })
    return card_founded
}

export function isSlugInCardList(card_slug: string | undefined, card_list: string[] | undefined) {
    let card_founded = false;
    if (card_slug == undefined || card_list == undefined) { return card_founded }
    card_list.map(_card => {
        if (_card == card_slug) {
            card_founded = true;
        }
    })
    return card_founded
}

export function isSlugInSlugList(card_slug: string | undefined, card_list: string[] | undefined) {
    let card_founded = false;
    if (card_slug == undefined || card_list == undefined) { return card_founded }
    card_list.map(_card => {
        if (_card == card_slug) {
            card_founded = true;
        }
    })
    return card_founded
}

