import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { setCurrentSkill } from '@/store/reducers/matchReducer';
import BasicButton from '@/components/button/basic';
import { SimpleCard } from '../containers/DefaultContainer';
import { ThemedText } from '@/components/themed/ThemedText';


export function OnAttack() {
    const card_skill = useSelector((state: RootReducer) => state.matchReducer.player_match_settings?.current_skill)
    const dispatch = useDispatch()
    console.log(card_skill?.deck[0].slug)

    return (
        <ThemedModal title='Carta revelada:' hideCloseButton closeModal={() => { }} >
            <SimpleCard card={{ slug: card_skill?.deck[0].slug! }} size='medium' />
            {card_skill?.deck[0].card_type === 'miracle' &&
                <ThemedText>A carta é do tipo MILAGRE. Você comprou uma carta!</ThemedText>
            }
            <BasicButton
               
                onPress={() => {
                    dispatch(setCurrentSkill(undefined))
                }}
            >Ok</BasicButton>
        </ThemedModal>
    )
}
