import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button_txtInput');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      style={[
        { backgroundColor, borderColor },
        styles.textInput,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth: 200,
    maxWidth: "80%",
    borderWidth: 1,
  }
});
