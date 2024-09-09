import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    runOnJS,
} from 'react-native-reanimated';


type Props = {
    children?: React.ReactNode;
    up_action: (onUp: boolean) => void;
}

export function SlideUp(props: Props) {
    const onUp = useSharedValue(false);
    const position = useSharedValue(0);

    const ITEM_HEIGHT = 150;
    const END_POSITION = -(ITEM_HEIGHT);


    const styles = StyleSheet.create({
        box: {
            borderRadius: 20,
            borderWidth: 2,
        },
    });

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (onUp.value) {
                position.value = END_POSITION + e.translationY;
            } else {
                position.value = e.translationY;
            }
        })
        .onEnd((e) => {
            if (position.value > END_POSITION * 2 / 3) {
                position.value = withTiming(0, { duration: 100 });
                onUp.value = false;
            } else {
                position.value = withTiming(END_POSITION, { duration: 100 });
                onUp.value = true;
            }
            'worklet'
            runOnJS(props.up_action)(onUp.value)
        })
    // .activateAfterLongPress(100)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
    }));

    return (
        <GestureHandlerRootView style={{ height: '100%', justifyContent: "flex-end", backgroundColor: 'red' }}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.box, animatedStyle]}>
                    {props.children}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

