import { useScreenSizes } from "./useScreenSizes"

// CARDS
const CARD_LIST: CardProps[] = [
    // Artefatos
    {
        slug: "arca-da-alianca",
        path: require("@/assets/images/Cards/Artefatos/Arca da Aliança.jpg"),
        description: "Todos os heróis na sua ZB ganham 1/1.",
    },
    {
        slug: "arca-de-noe",
        path: require("@/assets/images/Cards/Artefatos/Arca de Noé.jpg"),
        description: "O Herói equipado é indestrutível.",
    },
    {
        slug: "botas-do-evangelho",
        path: require("@/assets/images/Cards/Artefatos/Botas do Evagelho.jpg"),
        description: "Quando o Herói equipado atacar, compre uma carta.",
    },
    {
        slug: "cajado-de-moises",
        path: require("@/assets/images/Cards/Artefatos/Cajado de Moisés.jpg"),
        description: "O Herói equipado ganha 1/0. Se está equipado a Moisés, seus milagres custam -1 de sabedoria.",
    },
    {
        slug: "capacete-da-salvacao",
        path: require("@/assets/images/Cards/Artefatos/Capacete da Salvação.jpg"),
        description: "O Herói equipado recebe 1/0 e é incorruptível.",
    },
    {
        slug: "cinturao-da-verdade",
        path: require("@/assets/images/Cards/Artefatos/Cinturão da Verdade.jpg"),
        description: "Quando o Herói equipado atacar, o jogador alvo revela a carta do topo do seu deck e perde pontos de Fé igual ao custo de sabedoria desta carta.",
    },
    {
        slug: "couraca-da-justica",
        path: require("@/assets/images/Cards/Artefatos/Couraça da Justiça.jpg"),
        description: "O Herói equipado ganha 2/2.",
    },
    {
        slug: "escudo-da-fe",
        path: require("@/assets/images/Cards/Artefatos/Escudo da Fé.jpg"),
        description: "O Herói equipado ganha 0/2.",
    },
    {
        slug: "espada-do-espirito",
        path: require("@/assets/images/Cards/Artefatos/Espada do Espírito.jpg"),
        description: "O Herói equipado ganha 1/0 e é imbloqueável.",
    },
    {
        slug: "os-10-mandamentos",
        path: require("@/assets/images/Cards/Artefatos/Os 10 Mandamentos.jpg"),
        description: "Suas cartas custam -1 de Sabedoria para serrem jogadas.",
    },
    // Heróis
    {
        slug: "abraao",
        path: require("@/assets/images/Cards/Heróis/Abraão.jpg"),
    },
    {
        slug: "adao",
        path: require("@/assets/images/Cards/Heróis/Adão.jpg"),
    },
    {
        slug: "daniel",
        path: require("@/assets/images/Cards/Heróis/Daniel.jpg"),
    },
    {
        slug: "davi",
        path: require("@/assets/images/Cards/Heróis/Davi.jpg"),
    },
    {
        slug: "elias",
        path: require("@/assets/images/Cards/Heróis/Elias.jpg"),
    },
    {
        slug: "ester",
        path: require("@/assets/images/Cards/Heróis/Ester.jpg"),
    },
    {
        slug: "eva",
        path: require("@/assets/images/Cards/Heróis/Eva.jpg"),
    },
    {
        slug: "jaco",
        path: require("@/assets/images/Cards/Heróis/Jacó.jpg"),
    },
    {
        slug: "jose-do-egito",
        path: require("@/assets/images/Cards/Heróis/José do Egito.jpg"),
    },
    {
        slug: "josue",
        path: require("@/assets/images/Cards/Heróis/Josué.jpg"),
    },
    {
        slug: "maria",
        path: require("@/assets/images/Cards/Heróis/Maria.jpg"),
    },
    {
        slug: "moises",
        path: require("@/assets/images/Cards/Heróis/Moisés.jpg"),
    },
    {
        slug: "noe",
        path: require("@/assets/images/Cards/Heróis/Noé.jpg"),
    },
    {
        slug: "salomao",
        path: require("@/assets/images/Cards/Heróis/Salomão.jpg"),
    },
    {
        slug: "sansao",
        path: require("@/assets/images/Cards/Heróis/Sansão.jpg"),
    },
    // Lendárias
    {
        slug: "davi-lendario",
        path: require("@/assets/images/Cards/Lendárias/Davi.jpg"),
    },
    {
        slug: "josue-lendario",
        path: require("@/assets/images/Cards/Lendárias/Josué.jpg"),
    },
    {
        slug: "moises-lendario",
        path: require("@/assets/images/Cards/Lendárias/Moisés.jpg"),
    },
    // Milagres
    {
        slug: "cordeiro-de-deus",
        path: require("@/assets/images/Cards/Milagres/Cordeiro de Deus.jpg"),
        description: "Até o seu próximo turno, o jogador alvo não perde pontos de fé, pecados não o afetam, e suas cartas são indestrutíveis.",
    },
    {
        slug: "diluvio",
        path: require("@/assets/images/Cards/Milagres/Dilúvio.jpg"),
    },
    {
        slug: "fogo-do-ceu",
        path: require("@/assets/images/Cards/Milagres/Fogo do Céu.jpg"),
    },
    {
        slug: "forca-de-sansao",
        path: require("@/assets/images/Cards/Milagres/Força de Sansão.jpg"),
        description: "O Herói alvo ganha +3/+3 até o final do turno. Se o alvo é Sansão, ele se torna imbloqueável até o final do turno.",
    },
    {
        slug: "liberacao-celestial",
        path: require("@/assets/images/Cards/Milagres/Liberação Celestial.jpg"),
    },
    {
        slug: "no-ceu-tem-pao",
        path: require("@/assets/images/Cards/Milagres/No céu tem Pão.jpg"),
    },
    {
        slug: "passagem-segura",
        path: require("@/assets/images/Cards/Milagres/Passagem Segura.jpg"),
        description: "Os Heróis do jogador alvo são imbloqueáveis neste turno.",
    },
    {
        slug: "protecao-divina",
        path: require("@/assets/images/Cards/Milagres/Proteção Divina.jpg"),
        description: "O jogador alvo não sofre dano de efeitos ou ataques de Heróis neste turno.",
    },
    {
        slug: "ressurreicao",
        path: require("@/assets/images/Cards/Milagres/Ressurreição.jpg"),
    },
    {
        slug: "restauracao-de-fe",
        path: require("@/assets/images/Cards/Milagres/Restauração de Fé.jpg"),
    },
    {
        slug: "sabedoria-de-salomao",
        path: require("@/assets/images/Cards/Milagres/Sabedoria de Salomão.jpg"),
    },
    {
        slug: "sarca-ardente",
        path: require("@/assets/images/Cards/Milagres/Sarça Ardente.jpg"),
    },
    // Pecados
    {
        slug: "fruto-proibido",
        path: require("@/assets/images/Cards/Pecados/Fruto Proibído.jpg"),
    },
    {
        slug: "idolatria",
        path: require("@/assets/images/Cards/Pecados/Idolatria.jpg"),
    },
    {
        slug: "traicao",
        path: require("@/assets/images/Cards/Pecados/Traição.jpg"),
    },
    // Sabedoria
    {
        slug: "wisdom_card_0",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.jpg")
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
    var default_card = require('@/assets/images/Cards/carta_verso.jpg')
    var not_defense = require('@/assets/images/Cards/sabedoria_verso.jpg')

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

